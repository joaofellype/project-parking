import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class JobService {

    constructor(@InjectQueue("send-email") private queue: Queue){}

    async sendMail(createUserDto: CreateUserDto){
       await this.queue.add("send-job",createUserDto);
    }
    async sendMailResetPassword(updateUser:any){
        await this.queue.add("send-job-reset",updateUser);
    }
}
