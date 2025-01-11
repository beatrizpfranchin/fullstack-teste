import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  //Caminho da REST API para criar uma nova tarefa. 
  // Precisa da autenticação JWT
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  //Caminho da REST API para obter todos as tarefas no banco de dados. 
  // Precisa da autenticação JWT
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  //Caminho da REST API obter uma tarefa baseado em seu ID. 
  // Precisa da autenticação JWT
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.taskService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:authorId')
  //Caminho da REST API para obter todas as tarefas associadas a um usuário, baseado no ID do mesmo. 
  // Precisa da autenticação JWT
  findByAuthorId(@Param('authorId') authorId: string) {
    return this.taskService.findByAuthorId(+authorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  //Caminho da REST API para atualizar uma tarefa. 
  // Precisa da autenticação JWT
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  //Caminho da REST API para deletar uma tarefa. 
  // Precisa da autenticação JWT
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
