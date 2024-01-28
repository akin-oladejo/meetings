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
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/member/create-member.dto';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('hostId') hostId: string,
    @Query('startNow', ParseBoolPipe) startNow: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return this.spacesService.createSpace(startNow, hostId, isPrivate, createSpaceDto);
  }

  @Patch('/start')
  async startSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.startSpace(spaceId);
  }

  @Patch('/end')
  async endSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.endSpace(spaceId);
  }

  @Patch('/setPrivacy')
  async setPrivacy(
    @Query('spaceId') spaceId: string,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    // isPrivate = Boolean(isPrivate);
    return this.spacesService.setSpacePrivacy(spaceId, isPrivate);
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

  //------------------------------
  @Post('/members')
  joinSpace(@Query('spaceId') spaceId:string, @Body() createMemberDto: CreateMemberDto) {
    return this.spacesService.createMember(spaceId, createMemberDto);
  }

  @Get('/members')
  listAllMembers(
    @Query('spaceId') spaceId: string
  ) {
    return this.spacesService.listAllMembers(spaceId);
  }

  @Get('/members/:memberId')
  findOneMember(@Param('memberId') memberId: string) {
    return this.spacesService.findOneMember(memberId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.updateMember(id, updateMemberDto);
  // }

  @Patch('/members/:memberId')
  updateMemberName(@Param('memberId') memberId: string, @Query('name') name: string) {
    return this.spacesService.updateMemberName(memberId, name);
  }

  @Delete('/members/:memberId')
  removeMember(@Param('memberId') memberId: string) {
    return this.spacesService.removeMember(memberId);
  }
}
