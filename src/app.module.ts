import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpacesModule } from './spaces/spaces.module';
import { PartiesModule } from './parties/parties.module';
import { HostsModule } from './hosts/hosts.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { config, validationSchema } from 'src/config';
import { RedisModule} from './redis/redis.module'
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // PartiesModule,
    // HostsModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [config],
      validationSchema 
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    SpacesModule,
    // RedisModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
