import {Controller, Get, Param} from '@nestjs/common';
import Public from "../decorator/public";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import TaskService from 'src/service/task';

@ApiTags("任务")
@Controller('task')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: "视频",
    description: '定期更新视频'
  })
  @Public()
  @Get('video')
  video(@Param("id") id?: number) {
    return this.taskService.video(id);
  }
}
