import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ListUserDto } from 'src/users/dto/list-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmailResetPassword(user: UpdateUserDto) {

        const url = `http:localhost:3000/user/reset/password?hash=${user.codeactivation}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: "Reset password",
            template: '/resetPassword',
            context: {
                name: user.name,
                url
            }
        })

    }
    async sendConfirmCode(user: CreateUserDto) {

        await this.mailerService.sendMail({
            to: user.email,
            subject: "Codigo de confirmação",
            text: "klskdlskdlksldksl",
            template: './confirmCode',
            context: {
                name: user.name,
                code: user.codeactivation
            }
        }).catch(err => {
            console.log("ksjdksjdksjdksd")
            console.log(err)
        })
    }
}
