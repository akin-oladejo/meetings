import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
    ) {}
  @Post()
  createComment(
    @Query('spaceId') spaceId: string,
    @Query('replyTo') replyTo: string = null, // commentId of comment to reply
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(spaceId, replyTo, createCommentDto)
  }

  @Get()
  async getAllComments(@Query('spaceId') spaceId: string) {
    return this.commentsService.findAllComments(spaceId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOneComment(id);
  // }


  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId:string){
    return this.commentsService.deleteComment(commentId)
  }
}
