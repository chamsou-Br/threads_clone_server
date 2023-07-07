import { IsString  , IsEmail , IsStrongPassword , IsOptional } from "class-validator"


export class SignUpDto {

    @IsString()
    userName : string 

    @IsString()
    fullName :string 

    @IsString()
    sexe : string 

    @IsEmail()
    email : string 

    @IsString()
    password  : string 

    @IsString()
    @IsOptional()
    picture : string 

    @IsString()
    @IsOptional()
    bio : string 

}