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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/member/create-member.dto';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @ApiOperation({summary:"Create space"})
  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('hostId') hostId: string,
    @Query('startNow', ParseBoolPipe) startNow: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return this.spacesService.createSpace(startNow, hostId, isPrivate, createSpaceDto);
  }

  @ApiOperation({summary:"Start space"})
  @Patch('/start')
  async startSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.startSpace(spaceId);
  }

  @ApiOperation({summary:"End space"})
  @Patch('/end')
  async endSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.endSpace(spaceId);
  }

  @ApiOperation({summary:"Chnage space privacy"})
  @Patch('/setPrivacy')
  async setPrivacy(
    @Query('spaceId') spaceId: string,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    // isPrivate = Boolean(isPrivate);
    return this.spacesService.setSpacePrivacy(spaceId, isPrivate);
  }

  @ApiOperation({summary:"Return all spaces"})
  @Get()
  findAllSpaces() {
    return this.spacesService.findAllSpaces();
  }

  @ApiOperation({summary:"Find space by Id"})
  @Get(':id')
  async findOneSpace(@Param('id') id: string) {
    return this.spacesService.findOneSpace(id);
  }

  @ApiOperation({summary:"Update space details"})
  @Patch(':id')
  updateSpace(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.updateSpace(id, updateSpaceDto);
  }

  @ApiOperation({summary:"Delete space"})
  @Delete(':id')
  removeSpace(@Param('id') id: string) {
    return this.spacesService.removeSpace(id);
  }

  //------------------------------
  @ApiOperation({summary:'Join a space'})
  @Post('/members')
  joinSpace(@Query('spaceId') spaceId:string, @Body() createMemberDto: CreateMemberDto) {
    return this.spacesService.createMember(spaceId, createMemberDto);
  }

  @ApiOperation({summary:"List members in a space"})
  @Get('/members')
  listAllMembers(
    @Query('spaceId') spaceId: string
  ) {
    return this.spacesService.listAllMembers(spaceId);
  }

  @ApiOperation({summary:"Get particular member"})
  @Get('/members/:memberId')
  findOneMember(@Param('memberId') memberId: string) {
    return this.spacesService.findOneMember(memberId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.updateMember(id, updateMemberDto);
  // }

  @ApiOperation({summary:"Update member details"})
  @Patch('/members/:memberId')
  updateMemberName(@Param('memberId') memberId: string, @Query('name') name: string) {
    return this.spacesService.updateMemberName(memberId, name);
  }

  @ApiOperation({summary:"Eject/Exit member from space"})
  @Delete('/members/:memberId')
  removeMember(@Param('memberId') memberId: string) {
    return this.spacesService.removeMember(memberId);
  }
}
