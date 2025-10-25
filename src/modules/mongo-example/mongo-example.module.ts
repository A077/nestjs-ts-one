import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { MongoTodoService } from './todo.service';
import { MongoTodoController } from './todo.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  providers: [MongoTodoService],
  controllers: [MongoTodoController],
})
export class MongoExampleModule {}
