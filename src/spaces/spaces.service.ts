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
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/comment/create-comment.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private readonly spaceModel: Model<Space>,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly usersService: UsersService,
  ) {}

  async spaceExists(id: string) {
    return await this.spaceModel.exists({ _id: id }).exec() ? true : false;
  }

  async memberExists(id: string) {
    // this function is written as a shortcut to return a bool
    // for other services that will import the memberService
    return (await this.memberModel.exists({ _id: id }).exec()) ? true : false;
  }


  // --------------CREATE---------------------
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

  async createComment(
    spaceId: string,
    replyTo: string,
    createCommentDto: CreateCommentDto,
  ) {
    // verify space
    const spaceExists = await this.spaceExists(spaceId)

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }

    // if this is a reply i.e replyTo is passed, verify target comment
    if (replyTo) {
      const targetComment = await this.commentModel.findOne({ _id:replyTo }).exec();
      if (!targetComment) {
        throw new NotFoundException(`Comment with id ${replyTo} not found`);
      }
    }

    // create comment with values
    const comment = {
      ...createCommentDto,
      replyTo: replyTo,
      spaceId: spaceId,
    };

    return new this.commentModel(comment).save();
  }
  
  async createMember(spaceId: string, createMemberDto: CreateMemberDto) {
    // verify space
    const spaceExists = await this.spaceExists(spaceId);

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }
    
    const member = {
      spaceId: spaceId,
      ...createMemberDto
    }

    return new this.memberModel(member).save(); // save new member and return
  }
  

  // --------------READ-----------------------
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

  async findOneComment(id: string) {
    const comment = await this.commentModel
      .findOne({ _id: id }, { __v: 0 })
      .exec();
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }

  async findAllComments(spaceId: string) {
    // verify space
    const spaceExists = await this.spaceExists(spaceId)
    console.log(spaceExists)

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }

    return this.commentModel.find({ spaceId: spaceId }, { __v: 0 }).exec();
  }

  async listAllMembers(spaceId: string) {
    const spaceExists = await this.spaceExists(spaceId);

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }
    // return all members
    return this.memberModel.find({ spaceId:spaceId }, { __v: 0 }).exec();
  }

  async findOneMember(memberId: string) {
    const member = await this.memberModel.findOne({ _id: memberId }).exec();

    if (!member) {
      throw new NotFoundException(`member with id ${memberId} not found`);
    }

    return member;
  }

  // -------------PATCH----------------------
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


  // ----------------DELETE
  async removeMember(id: string) {
    const existingMember = await this.memberModel
    .findOneAndUpdate({ _id: id }, { $set: { isActive: false } })
    .exec();

    return 'Member removed'
  }

  async removeSpace(id: string) {
    await this.spaceModel.findOneAndDelete({ _id: id }).exec();
  }

  async deleteComment(commentId: string) {
    await this.commentModel.findOneAndDelete({ _id: commentId }).exec();
  }
}
