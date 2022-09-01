import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { CarModule } from './car/car.module';
import { JobModule } from './job/job.module';
import { ConfigModule} from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true}), UsersModule,MongooseModule.forRoot(process.env.MONGO_URI) ,AuthModule, MailModule, QrcodeModule, CarModule,JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
