import { Module,forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';
import { JobModule } from 'src/job/job.module';
import { JobService } from 'src/job/job.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name,schema:UserSchema}]),AuthModule, MailModule,forwardRef(() => JobModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
