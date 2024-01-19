import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpacesModule } from './spaces/spaces.module';
import { PartiesModule } from './parties/parties.module';
import { RatingsModule } from './ratings/ratings.module';
import { HostsModule } from './hosts/hosts.module';

@Module({
  imports: [SpacesModule, PartiesModule, RatingsModule, HostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
