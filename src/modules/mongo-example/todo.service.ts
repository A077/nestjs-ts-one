import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class MongoTodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<Todo>) {}

  async create(dto: CreateTodoDto) {
    const created = new this.todoModel(dto);
    return created.save();
  }

  async findAll() {
    return this.todoModel.find().exec();
  }

  async findOne(id: string) {
    const item = await this.todoModel.findById(id).exec();
    if (!item) throw new NotFoundException('Todo not found');
    return item;
  }

  async update(id: string, dto: UpdateTodoDto) {
    const item = await this.todoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!item) throw new NotFoundException('Todo not found');
    return item;
  }

  async remove(id: string) {
    const res = await this.todoModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Todo not found');
    return { deleted: true };
  }
}
