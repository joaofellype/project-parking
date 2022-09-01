import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { JobService } from './job.service';
import { SendMailConsumer } from './sendMail-consumer';

@Module({
  imports:[MailModule,BullModule.forRoot({ redis: { host:process.env.REDIS_HOST,port: 6379}}),BullModule.registerQueue({ name:'send-email',}), BullModule.registerQueue({ name:"send-email-reset"}), JobModule],
  providers: [JobService,SendMailConsumer],
  exports:[JobService]
})
export class JobModule {}
