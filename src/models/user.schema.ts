import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export enum newRoles {
    USER = 'user',
    ADMIN = 'admin',
   
  }
  
export const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:newRoles,default:newRoles.USER,required:true}

})

UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });