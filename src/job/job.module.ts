import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { JobService } from './job.service';
import { SendMailConsumer } from './sendMail-consumer';

@Module({
  imports: [MailModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("redis.host"),
          password: configService.get("redis.password"),
          port: configService.get("redis.port")
        }
      }),
      inject:[ConfigService]
    }),
    BullModule.registerQueue({ name: 'send-email', }), BullModule.registerQueue({ name: "send-email-reset" }), JobModule],
  providers: [JobService, SendMailConsumer],
  exports: [JobService]
})
export class JobModule { }
