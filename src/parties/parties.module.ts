import { Module, forwardRef } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, partySchema } from './entities/party.entity';
import { Invite, inviteSchema } from './entities/invite.entity';
import { UsersModule } from 'src/users/users.module';
import { SpacesModule } from 'src/spaces/spaces.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(()=>SpacesModule),
    MongooseModule.forFeature([
      { name: Party.name, schema: partySchema },
      { name: Invite.name, schema: inviteSchema },
    ]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService]
})
export class PartiesModule {}
