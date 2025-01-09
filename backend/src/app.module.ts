import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    DbModule,
    TaskModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
