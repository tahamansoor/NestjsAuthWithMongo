import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mongo-auth'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
