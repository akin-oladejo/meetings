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
import { UpdateMemberDto } from './dto/member/update-member.dto';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // -----------------POST-----------------
  @ApiOperation({ summary: 'Create space' })
  @Post()
  async create(
    @Body() createSpaceDto: CreateSpaceDto,
    @Query('hostId') hostId: string,
    @Query('partyId') partyId: string = null,
    @Query('startNow', ParseBoolPipe) startNow: boolean,
    // @Query('isPrivate', ParseBoolPipe) isPrivate: boolean,
  ) {
    return await this.spacesService.createSpace(
      startNow,
      hostId,
      partyId,
      createSpaceDto,
    );
  }

  @ApiOperation({ summary: 'Create a comment' })
  @Post('/comments')
  async createComment(
    @Query('spaceId') spaceId: string,
    @Query('replyTo') replyTo: string = null, // commentId of comment to reply
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.spacesService.createComment(spaceId, replyTo, createCommentDto);
  }

  @ApiOperation({ summary: 'Join a space (Create a member)' })
  @Post('/members')
  async joinSpace(
    @Query('spaceId') spaceId: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return await this.spacesService.createMember(spaceId, createMemberDto);
  }

  // -----------------GET-----------------
  @ApiOperation({ summary: 'Return all comments in a space' })
  @Get('/comments')
  async getAllComments(@Query('spaceId') spaceId: string) {
    return await this.spacesService.findAllComments(spaceId);
  }

  // @Get('/comments/:id')
  // findOne(@Param('id') id: string) {
  //   return this.spacesService.findOneComment(id);
  // }

  @ApiOperation({ summary: 'List members in a space' })
  @Get('/members')
  async listAllMembers(@Query('spaceId') spaceId: string) {
    return await this.spacesService.listAllMembers(spaceId);
  }

  @ApiOperation({ summary: 'Get particular member' })
  @Get('/members/:memberId')
  async findOneMember(@Param('memberId') memberId: string) {
    return await this.spacesService.findOneMember(memberId);
  }

  @ApiOperation({ summary: 'Find space by Id' })
  @Get(':id')
  async findOneSpace(@Param('id') id: string) {
    return await this.spacesService.findOneSpace(id);
  }

  // -----------------PATCH-----------------
  @ApiOperation({ summary: 'Start space' })
  @Patch('/start')
  async startSpace(@Query('spaceId') spaceId: string) {
    return await this.spacesService.startSpace(spaceId);
  }

  @ApiOperation({ summary: 'End space' })
  @Patch('/end')
  async endSpace(@Query('spaceId') spaceId: string) {
    return await this.spacesService.endSpace(spaceId);
  }

  @ApiOperation({ summary: 'Update member details' })
  @Patch('/members/:memberId')
  async updateMemberName(
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return await this.spacesService.updateMemberName(memberId, updateMemberDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.updateMember(id, updateMemberDto);
  // }

  @ApiOperation({ summary: 'Update space details' })
  @Patch(':id')
  async updateSpace(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return await this.spacesService.updateSpace(id, updateSpaceDto);
  }

  // -----------------DELETE-----------------
  @ApiOperation({ summary: 'Delete a comment' })
  @Delete('/comments/:commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return await this.spacesService.deleteComment(commentId);
  }

  @ApiOperation({ summary: 'Eject/Exit member from space' })
  @Delete('/members/:memberId')
  async removeMember(@Param('memberId') memberId: string) {
    return await this.spacesService.removeMember(memberId);
  }

  @ApiOperation({ summary: 'Delete space' })
  @Delete(':id')
  async removeSpace(@Param('id') id: string) {
    return await this.spacesService.removeSpace(id);
  }
}
