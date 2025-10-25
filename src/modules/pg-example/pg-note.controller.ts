import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PgNoteService } from './pg-note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pg-notes')
@Controller('pg/notes')
export class PgNoteController {
  constructor(private readonly service: PgNoteService) {}

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
