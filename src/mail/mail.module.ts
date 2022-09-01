import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },

    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
