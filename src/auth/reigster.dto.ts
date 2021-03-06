import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { newRoles } from "src/models/user.schema";

export class RegisterDto {
  @ApiProperty({ type: String })
  @IsString()
  name:string;

  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email:string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;


  @ApiProperty({enum:newRoles})
  @IsEnum(newRoles)
  role:newRoles;
  }