import { IsString  , IsEmail , IsStrongPassword , IsOptional } from "class-validator"


export class SignInDto {

    @IsEmail()
    email : string 

    @IsString()
    password  : string 

}