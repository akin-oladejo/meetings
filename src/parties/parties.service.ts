import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './entities/party.entity';
import { Model } from 'mongoose';
import { Invite } from './entities/invite.entity';
import { UsersService } from 'src/users/users.service';
import { SpacesService } from 'src/spaces/spaces.service';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly partyModel: Model<Party>,
    @InjectModel(Invite.name) private readonly inviteModel: Model<Invite>,
    private readonly userService: UsersService,
    @Inject(forwardRef(()=>SpacesService)) private readonly spaceService: SpacesService
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

  findSpacesbyParty(partyId:string) {
    return this.spaceService.findSpacesbyParty(partyId)
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

  async updateParty(id: string, updatePartyDto: UpdatePartyDto) {
    const existingParty = await this.partyModel
      .findOneAndUpdate({ _id: id }, { $set: updatePartyDto }, { new: true })
      .exec();

    if (!existingParty) {
      throw new NotFoundException(`Party with id ${id} not found`);
    }

    return existingParty;
  }

  async closeParty(partyId: string) {
    await this.partyModel.findOneAndDelete({ _id: partyId }).exec()
  }

  // -----------------------

  async setPartyPrivacy(id: string, isPrivate: boolean) {
    // const existingSpace = await this.partyModel
    //   .findOneAndUpdate(
    //     { _id: id },
    //     { $set: { isPrivate: isPrivate } },
    //     { new: true },
    //   )
    //   .exec();
    // if (!existingSpace) {
    //   throw new NotFoundException(`Space with id ${id} not found`);
    // }
    // return existingSpace;
  }
}
