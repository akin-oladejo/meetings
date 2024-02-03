import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './entities/space.entity';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/member/create-member.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private readonly spaceModel: Model<Space>,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    private readonly usersService: UsersService,
  ) {}

  async spaceExists(id: string) {
    return (await this.spaceModel.exists({ _id: id }).exec()) ? true : false;
  }

  async createSpace(
    startNow: boolean,
    hostId: string,
    partyId: string,
    isPrivate: boolean,
    createSpaceDto: CreateSpaceDto,
  ) {
    // verify host exists
    const hostExists = await this.usersService.userExists(hostId);

    if (!hostExists) {
      throw new NotFoundException(`Cannot find host. No user with id '${hostId}'. Also check if you passed in the hostId query.`);
    }

    // verify party exists
    // if (partyId) {
    //   //
    // }

    const space = {
      ...createSpaceDto,
      hostId: hostId,
      partyId: partyId,
      inSession: startNow ? true : false,
      isPrivate: isPrivate ? true : false,
      startTime: startNow ? new Date() : null,
      
    };

    return new this.spaceModel(space).save();
  }

  findAllSpaces() {
    return this.spaceModel.find({}, { __v: 0 }).exec();
  }

  async findOneSpace(id: string) {
    const space = await this.spaceModel.findOne({ _id: id }, { __v: 0 }).exec();

    if (!space) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }
    return space;
  }

  async startSpace(id: string) {
    const existingSpace = await this.spaceModel.findOne({ _id: id }).exec();

    // verify space exists
    if (!existingSpace) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }

    // verify space is not in session
    if (existingSpace.inSession) {
      throw new ConflictException(`Space with id ${id} is already in session`);
    }

    return await this.spaceModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { inSession: true, startTime: new Date() } },
        { new: true },
      )
      .exec();
  }

  async endSpace(id: string) {
    const existingSpace = await this.spaceModel.findOne({ _id: id }).exec();

    // verify space exists
    if (!existingSpace) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }

    // verify space is not in session
    if (!existingSpace.inSession) {
      throw new ConflictException(`Space with id ${id} has already been ended`);
    }

    return await this.spaceModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { inSession: false, endTime: new Date() } },
        { new: true },
      )
      .exec();
  }


  async updateSpace(id: string, updateSpaceDto: UpdateSpaceDto) {
    const existingSpace = await this.spaceModel
      .findOneAndUpdate({ _id: id }, { $set: updateSpaceDto }, { new: true })
      .exec();

    if (!existingSpace) {
      throw new NotFoundException(`Space with id {id} not found`);
    }
    return existingSpace;
  }

  async removeSpace(id: string) {
    await this.spaceModel.findOneAndDelete({ _id: id }).exec();
  }

  // ---------------------- members ---------
  async memberExists(id: string) {
    // this function is written as a shortcut to return a bool
    // for other services that will import the memberService
    return (await this.memberModel.exists({ _id: id }).exec()) ? true : false;
  }

  async createMember(spaceId: string, createMemberDto: CreateMemberDto) {
    // verify space
    const spaceExists = await this.spaceExists(spaceId);

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }

    return new this.memberModel(createMemberDto).save(); // save new member and return
  }

  async listAllMembers(spaceId) {
    // return all members
    return this.memberModel.find({ spaceId }, { __v: 0 }).exec();
  }

  async findOneMember(id: string) {
    const member = await this.memberModel.findOne({ _id: id }).exec();

    if (!member) {
      throw new NotFoundException(`member with id ${id} not found`);
    }
    return member;
  }

  // async updateMember(id: string, updateMemberDto: UpdateMemberDto) {
  //   const existingMember = await this.memberModel
  //     .findOneAndUpdate({ _id: id }, { $set: updateMemberDto }, { new: true })
  //     .exec();

  //   if (!existingMember) {
  //     throw new NotFoundException(`member with id ${id} not found`);
  //   }

  //   return this.findOneMember(existingMember.id);
  // }

  async updateMemberName(id: string, name: string) {
    const existingMember = await this.memberModel
      .findOneAndUpdate({ _id: id }, { $set: { name: name } }, { new: true })
      .exec();

    if (!existingMember) {
      throw new NotFoundException(`member with id ${id} not found`);
    }

    return this.findOneMember(existingMember.id);
  }

  async removeMember(id: string) {
    await this.memberModel.findByIdAndDelete(id).exec();
  }
}
