import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/login.dto';
import { User } from 'src/types/user';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
      ) {}
      async create(userDto: UserDto) {
        const { email } = userDto;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        try{
        const createdUser = new this.userModel(userDto);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
      }catch(error){
        throw error;
        
      }
      }
   // return user object without password
      sanitizeUser(user: User) {
       try{ 
        const sanitized = user.toObject();

        delete sanitized['password'];

        return sanitized;
      }
      catch(error){
      throw error;
    }
      }
      async findByLogin(UserDTO: LoginDTO) {

        const { email, password } = UserDTO;

        const user = await this.userModel.findOne({ email });

        if (!user) {
          throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
        }

        if (await bcrypt.compare(password, user.password)) {
          return this.sanitizeUser(user)
        }
         else {
          throw new ForbiddenException("invalid creditals");
        }
      }
      async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
      }
}
