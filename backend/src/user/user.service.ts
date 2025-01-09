import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  
    create(createUserDto: CreateUserDto) {
      return this.prismaService.user.create({
        data: createUserDto,
      });
    }
  
    findAll() {
      return this.prismaService.user.findMany();
    }


    findOne(id: string) {
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
      return this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    }
  
    remove(id: number) {
      return this.prismaService.user.delete({
        where: { id },
      });
    }
}
