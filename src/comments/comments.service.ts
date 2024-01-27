import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpacesService } from 'src/spaces/spaces.service';
import { Comment } from './entities/comment.entity';
import { Space } from 'src/spaces/entities/space.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly spacesService:SpacesService,
    // @InjectModel(Space.name) private readonly spaceModel: Model<Space>,
  ) {}

  // async spaceExists(spaceId) {
  //   return (await this.spaceModel.findOne({ _id: spaceId }).exec())
  //     ? true
  //     : false;
  // }

  async createComment(
    spaceId: string,
    replyTo: string,
    createCommentDto: CreateCommentDto,
  ) {
    // verify space
    // const space = await this.spaceModel.findOne({ _id: spaceId }).exec();
    const spaceExists = await this.spacesService.spaceExists(spaceId)
    // console.log(spaceExists)

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
    // const space = await this.spaceModel.findOne({ _id: spaceId }).exec();
    const spaceExists = this.spacesService.spaceExists(spaceId)

    if (!spaceExists) {
      throw new NotFoundException(`Space with id ${spaceId} not found`);
    }

    return this.commentModel.find({ spaceId: spaceId }, { __v: 0 }).exec();
  }

  async deleteComment(commentId: string) {
    await this.commentModel.findOneAndDelete({ _id: commentId }).exec();
  }
}
