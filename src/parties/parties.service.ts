import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Party } from './entities/party.entity';
import { Model } from 'mongoose';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly partyModel: Model<Party>
    ){}
  async createParty(createPartyDto: CreatePartyDto) {
    // const party = await 
    return 'This action adds a new party';
  }

  // findAll() {
  //   return `This action returns all parties`;
  // }

  findOneParty(id: number) {
    return `This action returns a #${id} party`;
  }

  updateParty(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  closeParty(id: number) {
    return `This action removes a #${id} party`;
  }
}
