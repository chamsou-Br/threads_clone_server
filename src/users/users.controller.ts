import {
  Body,
  Controller,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { ResponseHelper } from 'src/utils/response';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  test() {
    return 'Hello world from auth !';
  }

  @Post('/signup')
  async signUp(@Body() body: SignUpDto) {
    let user = await this.userService.findUserByEmail(body.email);

    if (user != null) {
      throw new BadRequestException('this email is already registred !');
    }
    user = await this.userService.createUser(
      body.fullName,
      body.userName,
      body.email,
      body.password,
      body.sexe,
    );

    return ResponseHelper.createdResponse({
      userName: user.userName,
      fullName: user.fullName,
      sexe: user.sexe,
      email: user.email,
      bio: user.bio,
      picture: user.picture,
    });
  }

  @Post("/signin")
  async signIn(@Body() body : SignInDto){
    
  }
}
