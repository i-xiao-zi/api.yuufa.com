import {Controller, Get} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";
import CronService from '../service/cron';

@ApiTags("Task")
@Controller('task')
export default class TaskController {
  constructor(private readonly cronService: CronService) {}

  @Json(false)
  @Get('you-nong-pai')
  @Public()
  youNongPai() {
    return this.cronService.youNongPai();
  }
}
