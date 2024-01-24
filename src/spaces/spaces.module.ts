import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, spaceSchema } from './entities/space.entity';
import { SpacesController } from './spaces.controller';
import { Comment, commentSchema } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Space.name, schema: spaceSchema }, { name: Comment.name, schema: commentSchema}]),
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
