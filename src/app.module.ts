import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpacesModule } from './spaces/spaces.module';
import { PartiesModule } from './parties/parties.module';
import { HostsModule } from './hosts/hosts.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [SpacesModule, PartiesModule, HostsModule, DrizzleModule, ConfigModule.forRoot(), CommentsModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
