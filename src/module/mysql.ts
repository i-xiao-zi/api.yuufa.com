import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entity/user';
import {ConfigModule, ConfigService} from "@nestjs/config";
import fs from "fs";
import path from "path";
import UserModelService from '../service/user.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '../entity/*.ts'],
        autoLoadEntities: true,
        logging: ['error'], // true
        timezone: "+08:00",
        logger: "advanced-console",
        ssl: configService.get<string>('NODE_ENV') == 'production' ? {
          ca:  fs.readFileSync(path.join(__dirname, '../../mysql.pem')),
        } : null,
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User, 
    ]),
  ],
  providers: [
    UserModelService, 
  ],
  exports: [
    UserModelService, 
  ],
})
export default class MysqlModule {}