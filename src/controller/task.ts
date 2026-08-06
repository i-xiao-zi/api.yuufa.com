import {Controller, Get, Param} from '@nestjs/common';
import Public from "../decorator/public";
import TaskService from 'src/service/task';

@Controller('task')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Public()
  @Get('video')
  video(@Param("id") id?: number) {
    return this.taskService.video(id);
  }
}
