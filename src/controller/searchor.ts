import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../service/supabase';

@Controller('searchor')
export default class SearchorController {
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}

  @Get()
  async index() {
    const json = await this.supabase.from('searchors').select().is('deleted_at', null);
    return json.data;
  }
}
