import { OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { MailService } from "src/mail/mail.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";



@Processor("send-email")
class SendMailConsumer {

    constructor(private mailService: MailService){}

    @Process("send-job")
    async sendEmailJob(job: Job<CreateUserDto> ){
        const  { data } = job;

       await this.mailService.sendConfirmCode(data);
    }
    @Process("send-job-reset")
    async sendEmailResetPassword(job: Job<UpdateUserDto>){
        const { data } = job;
        console.log(data)
        await this.mailService.sendEmailResetPassword(data);
    }

    @OnQueueCompleted()
    onCompleted(job:Job){
        console.log(`Job completed ${job.name}`)
    }
    @OnQueueProgress()
    onProgress(job:Job){
        console.log(`Job PROGRESS ${job.name}`)
    }
    
}
export { SendMailConsumer };