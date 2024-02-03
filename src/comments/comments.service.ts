import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../spaces/dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../spaces/dto/comment/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpacesService } from 'src/spaces/spaces.service';
import { Comment } from '../spaces/entities/comment.entity';
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


}
