import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/types/payload.interface';
import { UserService } from 'src/user/user.service';
require('dotenv').config()
console.log(process.env.SECRET_KEY)

@Injectable()
export class AuthService {
    
  constructor(private userService: UserService) {}
  
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
