import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CarModule } from './car/car.module';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration'
import validationSchema  from './config/validation';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `${process.cwd().replace("\\","/")}/src/config/env/${process.env.NODE_ENV}.env`,
    load:[configuration],
    validationSchema,
    isGlobal: true
  }),
    UsersModule,
  MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    MailModule,
    CarModule,
    JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
