import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { PgNoteService } from './pg-note.service';
import { PgNoteController } from './pg-note.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [PgNoteService],
  controllers: [PgNoteController],
})
export class PgExampleModule {}
