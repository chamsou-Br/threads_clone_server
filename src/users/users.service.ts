import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {Repository} from "typeorm"
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private user : Repository<User> ,
        private jwtService: JwtService
    ){}

    async createUser(fullName : string , userName : string , email : string , password : string , sexe: string ) {
        const hashPassword = await this.hashPassword(password)
       let user = this.user.create({
           fullName,
           userName,
           email,
           password : hashPassword,
           sexe
       })
       return await this.user.save(user);
    }

    async findUserByEmail (email : string){
        const user = await this.user.findOneBy({email });
        return user;
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10; // Number of salt rounds for hashing
        return await bcrypt.hash(password, saltOrRounds);
    }

    async generateToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload,{secret : process.env.SECRET_KEY});
      }
    
      async verifyToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token,{
            secret : process.env.SECRET_KEY
        });
      }
}
