import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseBoolPipe,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/space/create-space.dto';
import { UpdateSpaceDto } from './dto/space/update-space.dto';
import { boolean } from '@hapi/joi';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
// import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('startNow', ParseBoolPipe) startNow: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return this.spacesService.createSpace(startNow, isPrivate, createSpaceDto);
  }

  @Patch('/start')
  async startSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.startSpace(spaceId);
  }

  @Patch('/end')
  async endSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.endSpace(spaceId);
  }

  @Patch(':id/setPrivacy')
  async setPrivacy(
    @Param('id') id: string,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    isPrivate = Boolean(isPrivate);
    return this.spacesService.setSpacePrivacy(id, isPrivate);
  }

  @Get()
  findAllSpaces() {
    return this.spacesService.findAllSpaces();
  }

  @Get(':id')
  async findOneSpace(@Param('id') id: string) {
    return this.spacesService.findOneSpace(id);
  }

  @Patch(':id')
  updateSpace(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.updateSpace(id, updateSpaceDto);
  }

  @Delete(':id')
  removeSpace(@Param('id') id: string) {
    return this.spacesService.removeSpace(id);
  }
}
