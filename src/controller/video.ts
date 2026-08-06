import {Controller, Get, Param, Post, Query} from '@nestjs/common';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../service/supabase';

@Controller('video')
export default class VideoController {
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}

  @Get()
  async list(@Query('video_name') video_name?: string, @Query('page') page: number = 1, @Query('size') size: number = 20) {
    const data = await this.supabase.from('videos_3' as 'videos').select('*', {count: 'exact'}).is('deleted_at', null).range((page-1)*size, page * size-1);
    return {
      data: data.data,
      count: data.count,
      total: Math.ceil((data.count ?? 0) / size),
      size,
      page,
    }
  }

  @Get(":id")
  async video_detail(@Param("id") id: number) {
    const data = await this.supabase.from('videos_3' as 'videos').select('*').eq('id', id).is('deleted_at', null).limit(1);
    return data.data ? data.data[0] : null;
  }

  @Get('origin')
  async origin_list() {
    const data = await this.supabase.from('video_origins').select('*').is('deleted_at', null);
    return data.data;
  }
  
  @Get('origin/active')
  async origin_active() {
    const data = await this.supabase.from('video_origins').select('*').eq('active', true).is('deleted_at', null).limit(1);
    return data.data ? data.data[0] : null;
  }
  
  @Post('origin/active')
  async origin_actived() {
    const data = await this.supabase.from('video_origins').select('*').eq('active', true).is('deleted_at', null).limit(1);
    return data.data ? data.data[0] : null;
  }
}
