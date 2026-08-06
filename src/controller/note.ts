import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import Public from "../decorator/public";
import "multer";
import type { TablesUpdate, TablesInsert, Database } from '../service/supabase';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller("note")
export default class NoteController {
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}

  @Get()
  @Public()
  async index() {
    const json = await this.supabase.from('note_categories').select().eq('parent_id', 0).is('deleted_at', null);
    return json.data;
  }

  @Get("content/:id")
  @Public()
  async findContent(@Param("id") id: number) {
    const json = await this.supabase.from('note_contents').select().eq('id', id).is('deleted_at', null);
    return json.data;
  }

  @Post("content")
  @Public()
  async createContent( @Body() data: TablesInsert<'note_contents'>) {
    const json = await this.supabase.from('note_contents').insert(data);
    return json.data;
  }

  @Post("content/:id")
  @Public()
  async updateContent( @Param("id") id: number, @Body() data: TablesUpdate<'note_contents'>) {
    const json = await this.supabase.from('note_contents').update(data).eq('id', id);
    return json.data;
  }
}
