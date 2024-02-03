import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../spaces/dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../spaces/dto/comment/update-comment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
    ) {}


}
