import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  //Caminho da REST API para criar um novo usuário. 
  //Não precisa de autenticação
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  //Caminho da REST API para obter todos os usuários 
  // Precisa da autenticação JWT
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  //Caminho da REST API para obter um usuário baseado num ID. 
  //Precisa da autenticação JWT
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  //Caminho da REST API para atualizar um usuário. 
  //Precisa da autenticação JWT
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  //Caminho da REST API para deletar um usuário. 
  //Precisa da autenticação JWT
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
