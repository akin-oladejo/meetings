import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './entities/party.entity';
import { Model } from 'mongoose';
import { Request } from './entities/request.entity';
import { UsersService } from 'src/users/users.service';
import { SpacesService } from 'src/spaces/spaces.service';
import { CreateRequestDto } from './dto/request/create-request.dto';
import { UpdateRequestDto } from './dto/request/update-request.dto';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly partyModel: Model<Party>,
    @InjectModel(Request.name) private readonly requestModel: Model<Request>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => SpacesService))
    private readonly spaceService: SpacesService,
  ) {}

  async partyExists(id: string) {
    return (await this.partyModel.exists({ _id: id }).exec()) ? true : false;
  }

  async createParty(creatorId: string, createPartyDto: CreatePartyDto) {
    // verify creator exists
    const creatorExists = await this.userService.userExists(creatorId);

    if (!creatorExists) {
      throw new NotFoundException(
        `Cannot find host. No user with id '${creatorId}'`,
      );
    }

    const party = {
      creatorId,
      members: [creatorId],
      ...createPartyDto,
    };

    return new this.partyModel(party).save(); // save new Party
  }

  findPartiesbyMemberId(memberId: string) {
    // return all Parties where you are a member
    return this.partyModel.find({ members: memberId }, { __v: 0 }).exec();
  }

  findSpacesbyParty(partyId: string) {
    return this.spaceService.findSpacesbyParty(partyId);
  }

  async findOneParty(id: string) {
    const Party = await this.partyModel
      .findOne({ _id: id }, { password: 0, __v: 0 })
      .exec();

    if (!Party) {
      throw new NotFoundException(`Party with id '${id}' not found`);
    }
    return Party;
  }

  async updateParty(partyId: string, updatePartyDto: UpdatePartyDto) {
    const existingParty = await this.partyModel
      .findOneAndUpdate(
        { _id: partyId },
        { $set: updatePartyDto },
        { new: true },
      )
      .exec();

    if (!existingParty) {
      throw new NotFoundException(`Party with id '${partyId} not found`);
    }

    return existingParty;
  }

  async joinParty(createRequestDto: CreateRequestDto) {
    // join a party if public, else send invite

    // verify requester
    const existingUser = await this.userService.findOneUser(
      createRequestDto.userId,
    );

    if (!existingUser) {
      throw new NotFoundException(
        `User with id '${createRequestDto.userId}' not found`,
      );
    }

    // verify party exists
    const existingParty = await this.findOneParty(createRequestDto.partyId);

    if (!existingParty) {
      throw new NotFoundException(
        `Party with id '${createRequestDto.partyId}' not found`,
      );
    }

    if (existingParty.members.includes(createRequestDto.userId)){
      return {message:'User already in party', data:{}}
    }

    // console.log(existingParty.isPrivate)

    if (existingParty.isPrivate) {
      // make sure join request hasn't been created
      const existingRequest = await this.requestModel.findOne({partyId:createRequestDto.partyId, userId:createRequestDto.userId}).exec()

      if (existingRequest){
        return {message:'Request already pending', data:{}}
      }

      // create Request
      const invite = new this.requestModel(createRequestDto)
      invite.save(); // save new member and return

      return {message:'Party is private. Request created', data:invite}
    } else {
      // console.log('Got here')

      // add to members list immediately
      const updatedParty = await this.partyModel
        .findOneAndUpdate(
          { _id: createRequestDto.partyId },
          { $addToSet: { members: createRequestDto.userId } },
          { new: true },
        )
        .exec();

      return {message: 'Join successful', data:updatedParty};
    }
  }

  async leaveParty(updateRequestDto: UpdateRequestDto) {
    // exit/eject member from a party

    // verify requester
    const existingUser = await this.userService.findOneUser(
      updateRequestDto.userId,
    );

    if (!existingUser) {
      throw new NotFoundException(
        `User with id '${updateRequestDto.userId}' not found`,
      );
    }

    // verify party exists
    const existingParty = await this.findOneParty(updateRequestDto.partyId);

    if (!existingParty) {
      throw new NotFoundException(
        `Party with id '${updateRequestDto.partyId}' not found`,
      );
    }

    // if user not in party, do nothing
    if (!(existingParty.members.includes(updateRequestDto.userId))){
      throw new NotFoundException(`User with id '${updateRequestDto.userId}' not in party`)
    }

    // verify it is not the creator trying to leave
    if (updateRequestDto.userId == existingParty.creatorId) {
      throw new ForbiddenException(
        `Creator cannot exit party for now. Close the party instead`,
      );
    }

    const updatedParty = await this.partyModel
      .findOneAndUpdate(
        { _id: updateRequestDto.partyId },
        { $pull: { members: updateRequestDto.userId } },
        { new: true },
      )
      .exec();

    return {message: 'Exit successful', data:updatedParty};
  }

  async listMembers(partyId: string) {
    const party = await this.partyModel.findOne({ _id: partyId });

    if (!party) {
      throw new NotFoundException(`Party with id '${partyId}' not found`);
    }

    return party.members;
  }

  listRequests(partyId: string) {
    return this.requestModel.find({ partyId });
  }

  async approveRequest(requestId: string) {
    const request = await this.requestModel.findOne({ _id: requestId }).exec();

    if (!request) {
      throw new NotFoundException(`Request with id '${requestId}' not found`);
    }

    const updatedParty = await this.partyModel
      .findOneAndUpdate(
        { _id: request.partyId },
        { $addToSet: { members: request.userId } },
        { new: true },
      )
      .exec();

    if (!updatedParty){
      throw new NotFoundException(`Party with id '${request.partyId}' not found`)
    }

    return updatedParty
  }

  async deleteRequest(requestId: string) {
    await this.requestModel.findByIdAndDelete(requestId).exec();
  }

  async closeParty(partyId: string) {
    await this.partyModel.findOneAndDelete({ _id: partyId }).exec();
  }

  // -----------------------

  // async setPartyPrivacy(id: string, isPrivate: boolean) {
  //   // const existingSpace = await this.partyModel
  //   //   .findOneAndUpdate(
  //   //     { _id: id },
  //   //     { $set: { isPrivate: isPrivate } },
  //   //     { new: true },
  //   //   )
  //   //   .exec();
  //   // if (!existingSpace) {
  //   //   throw new NotFoundException(`Space with id ${id} not found`);
  //   // }
  //   // return existingSpace;
  // }
}
