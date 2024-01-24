import { Inject, Injectable } from '@nestjs/common';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
// import { Cache } from 'cache-manager';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SpacesService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ){ }

  create(createSpaceDto: CreateSpaceDto) {
    return createSpaceDto;
  }

  findAll() {
    return new Date();
  }

  async findOne(id: number) {
    return `This action returns a #${id} space`;
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}