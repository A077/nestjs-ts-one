import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notes')
export class Note {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  title?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  content?: string;
}
