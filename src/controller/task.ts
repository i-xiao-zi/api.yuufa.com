import {Controller, Get, Sse, Param} from '@nestjs/common';
import Public from "../decorator/public";
import TaskService from 'src/service/task';
import { Subject } from 'rxjs';

@Controller('task')
export default class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Public()
  @Sse('video')
  video() {
    const subject = new Subject<string>();
    this.taskService.video(subject);
    return subject.asObservable();
  }
}
