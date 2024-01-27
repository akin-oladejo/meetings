import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, spaceSchema } from './entities/space.entity';
import { SpacesController } from './spaces.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Space.name, schema: spaceSchema }]),
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
  exports: [SpacesService]
})
export class SpacesModule {}
