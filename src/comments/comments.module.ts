import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SpacesModule } from 'src/spaces/spaces.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './entities/comment.entity';
import { Space, spaceSchema } from 'src/spaces/entities/space.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: commentSchema }
    ]),
    SpacesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
