import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, spaceSchema } from './entities/space.entity';
import { SpacesController } from './spaces.controller';
import { Member, memberSchema } from './entities/member.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Space.name, schema: spaceSchema },
      { name: Member.name, schema: memberSchema },
    ]),
    UsersModule
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
  exports: [SpacesService],
})
export class SpacesModule {}
