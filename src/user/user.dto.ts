import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { newRoles } from "src/models/user.schema";

export class UserDto {
    @IsString()
    name:string;
    @IsString()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password: string;
    @IsEnum(newRoles)
    role:newRoles;
  }