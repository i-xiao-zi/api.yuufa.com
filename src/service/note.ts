import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database, TablesInsert, TablesUpdate } from './supabase';

@Injectable()
export default class NoteService {
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}
  index() {
    return instanceToPlain(this.children(0));
  }
  async findContent(id: number) {
    return (await this.supabase.from('note_contents').select().eq('id', id)).data;
  }
  async createContent(data: TablesInsert<'note_contents'>) {
    return (await this.supabase.from('note_contents').insert(data)).data;
  }
  async updateContent(id: number, data: TablesUpdate<'note_contents'>) {
    return (await this.supabase.from('note_contents').update(data).eq('id', id)).data;
  }
  private async children(parent_id: number) {
    return (await this.supabase.from('note_categories').select().eq('parent_id', parent_id)).data;
  }
}
