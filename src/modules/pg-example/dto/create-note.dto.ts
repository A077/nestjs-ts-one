import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ required: true })
  @IsString()
  title: string | undefined;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
