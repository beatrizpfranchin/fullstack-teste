import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DbModule,
    TaskModule,
    UserModule,
    AuthModule,
  ], //Importa os módulos de banco de dados, tarefas, usuários e autenticação
  controllers: [],
  providers: [],
})
export class AppModule {}
