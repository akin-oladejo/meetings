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
import { CreateCommentDto } from './dto/comment/create-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/member/create-member.dto';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // -----------------POST-----------------
  @ApiOperation({ summary: 'Create space' })
  @Post()
  create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('hostId') hostId: string,
    @Query('partyId') partyId: string = null,
    @Query('startNow', ParseBoolPipe) startNow: boolean,
    @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return this.spacesService.createSpace(
      startNow,
      hostId,
      partyId,
      isPrivate,
      createSpaceDto,
    );
  }

  @ApiOperation({ summary: 'Create a comment' })
  @Post('/comments')
  createComment(
    @Query('spaceId') spaceId: string,
    @Query('replyTo') replyTo: string = null, // commentId of comment to reply
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.spacesService.createComment(spaceId, replyTo, createCommentDto);
  }

  @ApiOperation({ summary: 'Join a space (Create a member)' })
  @Post('/members')
  joinSpace(
    @Query('spaceId') spaceId: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.spacesService.createMember(spaceId, createMemberDto);
  }

  // -----------------GET-----------------
  @ApiOperation({ summary: 'Return all spaces' })
  @Get()
  findAllSpaces() {
    return this.spacesService.findAllSpaces();
  }

  @ApiOperation({ summary: 'Return all comments in a space' })
  @Get('/comments')
  async getAllComments(@Query('spaceId') spaceId: string) {
    return this.spacesService.findAllComments(spaceId);
  }

  // @Get('/comments/:id')
  // findOne(@Param('id') id: string) {
  //   return this.spacesService.findOneComment(id);
  // }

  @ApiOperation({ summary: 'List members in a space' })
  @Get('/members')
  listAllMembers(@Query('spaceId') spaceId: string) {
    return this.spacesService.listAllMembers(spaceId);
  }

  @ApiOperation({ summary: 'Get particular member' })
  @Get('/members/:memberId')
  findOneMember(@Param('memberId') memberId: string) {
    return this.spacesService.findOneMember(memberId);
  }

  @ApiOperation({ summary: 'Find space by Id' })
  @Get(':id')
  async findOneSpace(@Param('id') id: string) {
    return this.spacesService.findOneSpace(id);
  }

  // -----------------PATCH-----------------
  @ApiOperation({ summary: 'Start space' })
  @Patch('/start')
  async startSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.startSpace(spaceId);
  }

  @ApiOperation({ summary: 'End space' })
  @Patch('/end')
  async endSpace(@Query('spaceId') spaceId: string) {
    return this.spacesService.endSpace(spaceId);
  }

  @ApiOperation({ summary: 'Update member details' })
  @Patch('/members/:memberId')
  updateMemberName(
    @Param('memberId') memberId: string,
    @Query('name') name: string,
  ) {
    return this.spacesService.updateMemberName(memberId, name);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.updateMember(id, updateMemberDto);
  // }

  @ApiOperation({ summary: 'Update space details' })
  @Patch(':id')
  updateSpace(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.updateSpace(id, updateSpaceDto);
  }

  // -----------------DELETE-----------------
  @ApiOperation({ summary: 'Delete a comment' })
  @Delete('/comments/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.spacesService.deleteComment(commentId);
  }

  @ApiOperation({ summary: 'Eject/Exit member from space' })
  @Delete('/members/:memberId')
  removeMember(@Param('memberId') memberId: string) {
    return this.spacesService.removeMember(memberId);
  }

  @ApiOperation({ summary: 'Delete space' })
  @Delete(':id')
  removeSpace(@Param('id') id: string) {
    return this.spacesService.removeSpace(id);
  }
}
