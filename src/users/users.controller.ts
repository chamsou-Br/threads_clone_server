import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  BadRequestException,
  NotFoundException,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { ResponseHelper } from 'src/utils/response';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { AuthGruad } from 'src/utils/auth.guard';

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
      throw new NotFoundException('this email is already registred !');
    }
    user = await this.userService.createUser(
      body.fullName,
      body.userName,
      body.email,
      body.password,
      body.sexe,
    );

    const token = await this.userService.generateToken({
      userName: user.userName,
      fullName: user.fullName,
      sexe: user.sexe,
      email: user.email,
      bio: user.bio,
      picture: user.picture,
    });

    return ResponseHelper.createdResponse({
      userName: user.userName,
      fullName: user.fullName,
      sexe: user.sexe,
      email: user.email,
      bio: user.bio,
      picture: user.picture,
      token,
    });
  }

 
  @Post('/signin')
  async signIn(@Body() body: SignInDto) {
    let user = await this.userService.findUserByEmail(body.email);

    if (user == null) {
      throw new BadRequestException("this Email doesn't registred yet !");
    }
    if (user) {
      const auth = await bcrypt.compare(body.password, user.password);
      if (auth) {
        const token = await this.userService.generateToken({
          userName: user.userName,
          fullName: user.fullName,
          sexe: user.sexe,
          email: user.email,
          bio: user.bio,
          picture: user.picture,
        });

        return ResponseHelper.createdResponse({
          userName: user.userName,
          fullName: user.fullName,
          sexe: user.sexe,
          email: user.email,
          bio: user.bio,
          picture: user.picture,
          token: token,
        });
      } else {
        throw new BadRequestException('this password is incorrect');
      }
    }
  }

@UseGuards(AuthGruad)
@Get("/profile")
async getProfile(@Request() req : any){
    return ResponseHelper.successResponse(req.user);
}
}
