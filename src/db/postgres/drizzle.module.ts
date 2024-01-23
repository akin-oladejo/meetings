import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DB_CONN } from 'src/common/constants';
import { drizzle } from "drizzle-orm/node-postgres";

@Module({
    imports:[ConfigModule],
    providers:[
        {
            provide: DB_CONN,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.get<string>('DATABASE_URL')
                })

                return drizzle(pool, {})
            }
        }
    ],
    exports: [DB_CONN]
})
export class DrizzleModule {}
