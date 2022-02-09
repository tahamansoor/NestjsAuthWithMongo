import { Body, Controller, ForbiddenException, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { RegisterDto } from './reigster.dto';
import {UserSchema} from 'src/models/user.schema'
import { request } from 'http';
import { User } from './role.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}
       
  @Get("/onlyauth")
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  async hiddenInformation(@User()user){ 
    if(user.role == "admin"){ 
      try{
        return "hidden infomation"
      }catch(error){
        throw error
      }
    }else{
        throw new ForbiddenException('you are not admin')
      }
  }
 
  
@Get("/anyone")
async publicInformation(){
return  "this can be seen by anyone";
}


    @Post('register')
    async register(@Body() RegisterDto:RegisterDto) {
      const user = await this.userService.create(RegisterDto);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
      const user = await this.userService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }
    
}
