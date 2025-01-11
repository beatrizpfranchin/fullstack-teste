import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  
    create(createUserDto: CreateUserDto) {
      //Função para a criação de um novo usuário no banco de dados
      return bcrypt.hash(createUserDto.password,10).then((hash: string) => { 
        //Cria um hash da senha para ser guardado no banco de dados para maior segurança
        const newUser = {
          password: hash,
          email: createUserDto.email,
          name: createUserDto.name
        }
        return this.prismaService.user.create({
          data: newUser,
        });
      });
    }
  
    findAll() {
      return this.prismaService.user.findMany();
    }


    findOne(id: string) {
      //ID e EMAIL são campos únicos no banco de dados, então usuários podem ser identificados por ambos.
      if (isNaN(+id)) 
        return this.findByEmail(id);
      else
        return this.findById(+id);
    }

  
    findById(id: number) {
      return this.prismaService.user.findUnique({
        where: { id },
      });
    }

    findByEmail(email: string) {
      return this.prismaService.user.findUnique({
        where: { email },
      });
    }
  
    update(id: number, updateUserDto: UpdateUserDto) {
      //Função para atualizar um usuário no banco de dados
      if (updateUserDto.password) {
        return bcrypt.hash(updateUserDto.password,10).then((hash: string) => {
          //Cria um hash da senha para ser guardado no banco de dados para maior segurança
          const updatedUser = {
            password: hash,
            email: updateUserDto.email,
            name: updateUserDto.name
          }
          return this.prismaService.user.update({
            where: { id },
            data: updatedUser,
          });
        });
      } else {
        return this.prismaService.user.update({
          where: { id },
          data: UpdateUserDto,
        });
      }
    }
  
    remove(id: number) {
      return this.prismaService.user.delete({
        where: { id },
      });
    }
}
