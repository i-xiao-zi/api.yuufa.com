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
import NoteController from './controller/note';
import TaskController from './controller/task';
import ControllerModule from './module/controller';
import TaskService from './service/task';
import VideoController from './controller/video';

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
    VideoController,
    // AuthController,
    NoteController,
    SearchorController
  ],
  providers: [
    AppService,
    TaskService,
    // AuthService,
  ],
})
export class AppModule {}
