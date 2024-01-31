import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
    ) {}

  @ApiOperation({summary:"Create a comment"})
  @Post()
  createComment(
    @Query('spaceId') spaceId: string,
    @Query('replyTo') replyTo: string = null, // commentId of comment to reply
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(spaceId, replyTo, createCommentDto)
  }

  @ApiOperation({summary:"Return all comments in a space"})
  @Get()
  async getAllComments(@Query('spaceId') spaceId: string) {
    return this.commentsService.findAllComments(spaceId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOneComment(id);
  // }

  @ApiOperation({summary:"Delete a comment"})
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId:string){
    return this.commentsService.deleteComment(commentId)
  }
}
