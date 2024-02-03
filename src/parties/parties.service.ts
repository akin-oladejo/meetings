import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './entities/party.entity';
import { Model } from 'mongoose';
import { Invite } from './entities/invite.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly partyModel: Model<Party>,
    @InjectModel(Invite.name) private readonly inviteModel: Model<Invite>,
    private readonly userService: UsersService
    ){}

    async partyExists(id: string) {
      return await this.partyModel.exists({_id:id}).exec()?true:false
    }
  
    async createParty(
      creatorId: string,
      createPartyDto: CreatePartyDto) {
      // verify creator exists
      const creatorExists = await this.userService.userExists(creatorId)
      
      if (!creatorExists){
        throw new NotFoundException(`Cannot find host. No user with id '${creatorId}'`);
      }

      const party = {
        creatorId,
        ...createPartyDto
      }
      
      return new this.partyModel(party).save() // save new Party
    }
  
    async findAllParties(
      memberId: string
    ) {
      // return all Partys
      return this.partyModel.find({}, { __v: 0, password: 0 }).exec();
    }
  
    async findOneParty(id: string) {
      const Party = await this.partyModel
        .findOne({ _id: id }, { password: 0, __v: 0 })
        .exec();
  
      if (!Party) {
        throw new NotFoundException(`Party with id ${id} not found`);
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
  
      return this.findOneParty(existingParty.id);
    }
  
    async removeParty(id: string) {
      await this.partyModel.findByIdAndDelete(id).exec();
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
