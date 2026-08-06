import {Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import AppService from '../service/app';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Json(false)
  @Get()
  async getIndex() {
    return this.appService.getIndex();
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.appService.upload(file);
  }
}
