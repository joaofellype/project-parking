import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocumet, User } from './entities/user.entity';
import { hashPassword, hashString } from '../infrasctruture/hash'
import { ResetPasswordDto } from './dto/reset-password.dto';
import { generateNumber } from '../utils/generatecode';
import { SendEmailDto } from './dto/send-email.dto';
import { NotFoundException } from 'src/infrasctruture/exceptions/notFoundException';
import { BadRequestException } from 'src/infrasctruture/exceptions/badRequestException';
import { JobService } from 'src/job/job.service';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocumet>, @InjectConnection() private connection: Connection,@Inject(forwardRef(() => JobService)) private jobService:JobService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(process.env.DATABASE_URL);
    const user = await this.userModel.findOne({ email: createUserDto.email }, '_id').exec();

    console.log(user)
    if (user) {
      throw new BadRequestException("Email já cadastrado");
    }
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new BadRequestException("Senhas não conferem")
    }
    createUserDto.password = await hashPassword(createUserDto.password);
    const codeactivation = generateNumber();
    createUserDto.codeactivation = codeactivation;
    const createdUser = new this.userModel(createUserDto);
   await this.jobService.sendMail(createUserDto);
    return createdUser.save();
  }

  async findAll() {

    const listUser = await this.userModel.find().exec();

    return listUser;

  }

  async findOne(id: string) {
    const user = await this.userModel.findById({ _id: id }).exec();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    return await this.userModel.updateOne({ _id: id }, updateUserDto);;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete({ _id: id });
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async sendEmailResetPassword(sendEmailDto: SendEmailDto) {

    const user = await this.userModel.findOne({ email: sendEmailDto.email }, '_id name email').exec();
    if (user) {
      var hash = await hashString();
      await this.userModel.updateOne({ _id: user.id }, { hashResetPassword: hash, dateChangePassword: new Date() });
      
      await this.jobService.sendMailResetPassword(user)
    } else {
      throw new NotFoundException("User not found");

    }
  }
  async validateCodeResetPassword(code: string) {
    var status = false;
    var dateMoreHour = new Date();
    dateMoreHour.setHours(dateMoreHour.getHours() + 1);
    const user = await this.userModel.findOne({ hashResetPassword: code }, '_id dateChangePassword').exec();
    if (user) {
      if (dateMoreHour <= user.dateChangePassword) {

        status = true;
        return status;
      }
      return status;
    }
    return status;
  }
  async resetPassword(code: string, resetPasswordDto: ResetPasswordDto) {
    const statusLink = await this.validateCodeResetPassword(code);
    if (!statusLink) {
      throw new BadRequestException("Link expirado ou incorreto");
    }
    const user = await this.userModel.findOne({ hashResetPassword: code }, '_id').exec();
    if (resetPasswordDto.confirmPassword === resetPasswordDto.password) {
      return await this.userModel.updateOne({ _id: user.id }, { password: await hashPassword(resetPasswordDto.password) });
    } else {
      throw new BadRequestException("As senhas não conferem");

    }

  }
  async validateCodeConfirm(code: string) {

    const user = await this.userModel.findOne({ codeactivation: code }, '_id').exec();
    if (user) {
      await this.userModel.updateOne({ _id: user.id }, { status: true });
    } else {
      throw new BadRequestException("Codigo incorreto");
    }
  }
  


}
