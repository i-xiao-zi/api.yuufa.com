import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import Public from "../decorator/public";
import SearchorService from "../service/searchor";

@Controller('searchor')
export default class SearchorController {
  constructor(private readonly searchorService: SearchorService) {}

  @Public()
  @Get()
  public index() {
    return this.searchorService.index();
  }
}
