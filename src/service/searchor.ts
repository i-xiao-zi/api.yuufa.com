import {Injectable} from '@nestjs/common';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase';

@Injectable()
export default class SearchorService {
  constructor(@InjectSupabaseClient() private readonly supabase: SupabaseClient<Database>) {}
  async index() {
    return (await this.supabase.from('searchors').select().is('deleted_at', null)).data;
  }

}
