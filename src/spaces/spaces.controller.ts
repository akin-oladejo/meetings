import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
  ParseBoolPipe,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
import { boolean } from '@hapi/joi';
// import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('start', ParseBoolPipe) start: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean
  ) {
    return this.spacesService.create(start, isPrivate, createSpaceDto);
  }

  // @Post('comment')
  // createComment(){
  //   return  
  // }
  @Post(':id/end')
  async endSpace(@Param('id') id:string) {
    return this.spacesService.endSpace(id)
  }

  @Post(':id/start')
  async startSpace(@Param('id') id:string) {
    return this.spacesService.startSpace(id)
  }

  @Post(':id/setPrivacy')
  async setPrivacy(@Param('id') id:string, @Query('isPrivate', ParseBoolPipe) isPrivate:boolean) {
    isPrivate = Boolean(isPrivate)
    return this.spacesService.setPrivacy(id, isPrivate)
  }

  @Get()
  findAll() {
    return this.spacesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.update(id, updateSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacesService.remove(id);
  }
}
