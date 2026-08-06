import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SupabaseModule } from 'nestjs-supabase-js';
import AuthModule from './module/auth';
import AppController from './controller/app';
import AppService from './service/app';
import MysqlModule from "./module/mysql";
import ResponseModule from "./module/response";
// import AuthController from "./controller/auth";
import AuthService from "./service/auth";
import SearchorController from "./controller/searchor";
import SearchorService from "./service/searchor";
import NoteController from './controller/note';
import NoteService from './service/note';
import TaskController from './controller/task';
import CronService from './service/cron';
import ControllerModule from './module/controller';
import TaskService from './service/task';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SupabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
        supabaseKey: configService.getOrThrow<string>('SUPABASE_KEY'),
      }),
    }),
    SupabaseModule.injectClient(),
    ScheduleModule.forRoot(),
    ControllerModule,
    // AuthModule,
    ResponseModule,
  ],
  controllers: [
    AppController,
    TaskController,
    // AuthController,
    NoteController,
    SearchorController
  ],
  providers: [
    AppService,
    CronService,
    TaskService,
    // AuthService,
    NoteService,
    SearchorService,
  ],
})
export class AppModule {}
