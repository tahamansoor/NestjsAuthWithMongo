
import { Document } from 'mongoose';
import { newRoles } from 'src/models/user.schema';

export interface User extends Document {
   name:string;
   email: string;
   password: string;
   role: newRoles;

}