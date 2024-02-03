import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/party/create-party.dto';
import { UpdatePartyDto } from './dto/party/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './entities/party.entity';
import { Model } from 'mongoose';
import { Invite } from './entities/invite.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly partyModel: Model<Party>,
    @InjectModel(Invite.name) private readonly inviteModel: Model<Invite>
    ){}

    async partyExists(id: string) {
      return await this.partyModel.exists({_id:id}).exec()?true:false
    }
  
  
    async createParty(
      creatorId: string,
      createPartyDto: CreatePartyDto) {
      // verify creator exists
      const creatorExists = await this.partyModel.exists({email:createPartyDto.email})
      
      if (exists){
        throw new EmailAlreadyRegisteredException()
      }
  
      new this.PartyModel(createPartyDto).save() // save new Party
      
      return this.PartyModel.findOne({email:createPartyDto.email}, {password:0, __v:0})
    }
  
    async findAllPartys() {
      // return all Partys
      return this.PartyModel.find({}, { __v: 0, password: 0 }).exec();
    }
  
    async findOneParty(id: string) {
      const Party = await this.PartyModel
        .findOne({ _id: id }, { password: 0, __v: 0 })
        .exec();
  
      if (!Party) {
        throw new NotFoundException(`Party with id ${id} not found`);
      }
      return Party;
    }
  
    async updateParty(id: string, updatePartyDto: UpdatePartyDto) {
      const existingParty = await this.PartyModel
        .findOneAndUpdate({ _id: id }, { $set: updatePartyDto }, { new: true })
        .exec();
  
      if (!existingParty) {
        throw new NotFoundException(`Party with id ${id} not found`);
      }
  
      return this.findOneParty(existingParty.id);
    }
  
    async removeParty(id: string) {
      await this.PartyModel.findByIdAndDelete(id).exec();
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
