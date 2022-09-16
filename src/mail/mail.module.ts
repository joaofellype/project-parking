import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [ConfigModule.forRoot(), 
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async(configService:ConfigService) =>({
        transport: {
          host:configService.get("email.host"),
          port:2525,
          auth: {
            user: configService.get("email.user"),
            pass: configService.get("email.pass")
          }
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
      }),
      inject:[ConfigService]
    })
    /*
    MailerModule.forRoot({
    transport: {
      host:process.env.EMAIL_HOST,
      port:2525,
      auth: {
        user: "5e6cea10a2b798",
        pass: "06ef4478f6983e"
      }
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    }
    // template: {
    //   dir: join(__dirname, 'templates'),
    //   adapter: new HandlebarsAdapter(),
    //   options: {
    //     strict: true,
    //   },
    // },
  })
  */
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
