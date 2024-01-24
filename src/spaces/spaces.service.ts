import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './entities/space.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private readonly spaceModel: Model<Space>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>
  ) {}

  create(start: boolean, isPrivate: boolean, createSpaceDto: CreateSpaceDto) {
    const space = {
      ...createSpaceDto,
      inSession: start ? true : false,
      isPrivate: isPrivate ? true : false,
    };

    return new this.spaceModel(space).save();
  }


  findAll() {
    return this.spaceModel.find().exec();
  }

  async findOne(id: string) {
    const space = await this.spaceModel.findOne({ _id: id }, {__v:0});
    if (!space) {
      throw new NotFoundException(`Space with id {id} not found`);
    }

    return space;
  }

  async startSpace(id: string) {
    const existingSpace = await this.spaceModel.findOneAndUpdate({_id:id}, {$set:{inSession:true}}, {new:true}).exec();

    if (!existingSpace){
      throw new NotFoundException(`Space with id {id} not found`)
    }
    return existingSpace
  }

  async endSpace(id: string) {
    const existingSpace = await this.spaceModel.findOneAndUpdate({_id:id}, {$set:{inSession:false}}, {new:true}).exec();

    if (!existingSpace){
      throw new NotFoundException(`Space with id {id} not found`)
    }
    return existingSpace
  }

  async setPrivacy(id: string, isPrivate:boolean) {
    const existingSpace = await this.spaceModel.findOneAndUpdate({_id:id}, {$set:{isPrivate:isPrivate}}, {new:true}).exec();

    if (!existingSpace){
      throw new NotFoundException(`Space with id {id} not found`)
    }
    return existingSpace
  }

  update(id: string, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: string) {
    return `This action removes a #${id} space`;
  }
}
