import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Report06Service } from './report-06.service';
import {FiltroFechaDto} from './dto/filtro-fecha.dto';


@Controller('report-06')
export class Report06Controller {
  constructor(private readonly report06Service: Report06Service) {}

  @Post()
  create(@Body() filtroFechaDto: FiltroFechaDto) {
    return this.report06Service.create(filtroFechaDto);
  }

 

 




}
