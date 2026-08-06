import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import Public from "../decorator/public";
import "multer";
import NoteService from '../service/note';
import {CreateNoteContent, UpdateNoteContent} from '../validator/note';
import type { TablesUpdate, TablesInsert } from '../service/supabase';

@Controller("note")
export default class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @Public()
  index() {
    return this.noteService.index();
  }

  @Get("content/:id")
  @Public()
  findContent(@Param("id") id: number) {
    return this.noteService.findContent(id);
  }

  @Post("content")
  @Public()
  createContent( @Body() data: TablesInsert<'note_contents'>) {
    return this.noteService.createContent(data);
  }

  @Post("content/:id")
  @Public()
  updateContent( @Param("id") id: number, @Body() data: TablesUpdate<'note_contents'>) {
    return this.noteService.updateContent(id, data);
  }
}
