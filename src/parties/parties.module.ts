import { Module, forwardRef } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, partySchema } from './entities/party.entity';
import { Request, requestSchema } from './entities/request.entity';
import { UsersModule } from 'src/users/users.module';
import { SpacesModule } from 'src/spaces/spaces.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(()=>SpacesModule),
    MongooseModule.forFeature([
      { name: Party.name, schema: partySchema },
      { name: Request.name, schema: requestSchema },
    ]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService]
})
export class PartiesModule {}
