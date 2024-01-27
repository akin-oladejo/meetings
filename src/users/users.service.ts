import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, MongooseError } from 'mongoose';
import { EmailAlreadyRegisteredException } from 'src/common/exceptions/EmailAlreadyRegistered.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async userExists(id: string) {
    // this function is written as a shortcut to return a bool 
    // for other services that will import the userService
    return await this.userModel.exists({_id:id}).exec()?true:false
  }


  async createUser(createUserDto: CreateUserDto) {
    // check that email is unique
    const exists = await this.userModel.exists({email:createUserDto.email})
    if (exists){
      throw new EmailAlreadyRegisteredException()
    }

    const user = new this.userModel(createUserDto).save()
    return this.userModel.findOne({email:createUserDto.email}, {password:0, __v:0})
  }

  async findAllUsers() {
    // return all users
    return this.userModel.find({}, { __v: 0, password: 0 }).exec();
  }

  async findOneUser(id: string) {
    const user = await this.userModel
      .findOne({ _id: id }, { password: 0, __v: 0 })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.findOneUser(existingUser.id);
  }

  async removeUser(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
