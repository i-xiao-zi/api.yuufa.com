import {Controller, Get, Sse, Param} from '@nestjs/common';
import Public from "../decorator/public";
import TaskService from 'src/service/task';

@Controller('task')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Public()
  @Sse('video')
  async video() {
    return await this.taskService.video();
  }
}
