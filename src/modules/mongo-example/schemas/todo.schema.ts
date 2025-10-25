import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Todo extends Document {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty({ required: false })
  @Prop()
  description?: string;

  @ApiProperty()
  @Prop({ default: false })
  completed: boolean;

  constructor(data: Todo) {
    super();
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
  }
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
