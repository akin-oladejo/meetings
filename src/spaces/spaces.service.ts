import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Space } from './entities/space.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private readonly spaceModel: Model<Space>
  ) {}

  createSpace(startNow: boolean, isPrivate: boolean, createSpaceDto: CreateSpaceDto) {
    const space = {
      ...createSpaceDto,
      inSession: startNow ? true : false,
      isPrivate: isPrivate ? true : false,
      startTime: startNow ? new Date() : null
    };

    return new this.spaceModel(space).save();
  }

  findAllSpaces() {
    return this.spaceModel.find().exec();
  }

  async findOneSpace(id: string) {
    const space = await this.spaceModel.findOne({ _id: id }, { __v: 0 }).exec();
    if (!space) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }
    return space;
  }

  async startSpace(id: string) {
    const existingSpace = await this.spaceModel.findOne({ _id: id }).exec()

    // verify space exists
    if (!existingSpace) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }

    // verify space is not in session
    if(existingSpace.inSession){
      throw new ConflictException(`Space with id ${id} is already in session`)
    }

    return await this.spaceModel.findOneAndUpdate({ _id: id }, {$set:{inSession:true, startTime:new Date()}}, {new:true}).exec()
  }

  async endSpace(id: string) {
    const existingSpace = await this.spaceModel.findOne({ _id: id }).exec()

    // verify space exists
    if (!existingSpace) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }

    // verify space is not in session
    if(!existingSpace.inSession){
      throw new ConflictException(`Space with id ${id} has already been ended`)
    }

    return await this.spaceModel.findOneAndUpdate({ _id: id }, {$set:{inSession:false, endTime:new Date()}}, {new:true}).exec()
  }

  async setSpacePrivacy(id: string, isPrivate: boolean) {
    const existingSpace = await this.spaceModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { isPrivate: isPrivate } },
        { new: true },
      )
      .exec();

    if (!existingSpace) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }
    return existingSpace;
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
    const space = await this.spaceModel.findOneAndDelete({_id:id}).exec()
  }
}
