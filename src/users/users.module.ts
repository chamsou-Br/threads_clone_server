import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm"
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGruad } from 'src/utils/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService , AuthGruad],
  exports : [UsersService]
})
export class UsersModule {}
