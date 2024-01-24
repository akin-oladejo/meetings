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
import { CreateCommentDto } from './dto/comment/create-comment.dto';
// import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('start', ParseBoolPipe) start: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return this.spacesService.createSpace(start, isPrivate, createSpaceDto);
  }

  @Post(':id/end')
  async endSpace(@Param('id') id: string) {
    return this.spacesService.endSpace(id);
  }

  @Post(':id/start')
  async startSpace(@Param('id') id: string) {
    return this.spacesService.startSpace(id);
  }

  @Post(':id/setPrivacy')
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

  @Post(':id/comment')
  createComment(
    @Param('spaceId') spaceId: string,
    @Param('replyTo') replyTo: string, // commentId of comment to reply
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.spacesService.createComment(spaceId, replyTo, createCommentDto)
  }

  @Get(':id/comments')
  async getAllComments(@Param('spaceId') spaceId: string) {
    return this.spacesService.findAllComments(spaceId);
  }

  @Delete(':id/comments')
  async deleteComment(@Param('commentId') commentId:string){
    return this.spacesService.deleteComment(commentId)
  }
}
