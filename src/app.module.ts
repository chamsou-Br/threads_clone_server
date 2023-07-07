import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ThreadsModule } from './threads/threads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import {ConfigModule} from "@nestjs/config"



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.db_host,
      "port": parseInt(process.env.db_port),
      "username": process.env.db_userName,
      "password": process.env.db_password,
      "database": process.env.db_name,
      "entities": [User],
      "synchronize": true
    }),
    UsersModule,
     ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
