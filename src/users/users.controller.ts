import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard} from '../auth/jwt-auth.guard';
import { SendEmailDto } from './dto/send-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { HttpExceptionFilterInfra } from 'src/infrasctruture/exceptions/httpExceptionFilterInfra';

@Controller('users')
@UseFilters(new HttpExceptionFilterInfra())
export class UsersController {
  constructor(private readonly usersService: UsersService,private  authService:AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ListUserDto[]> {
    const lista = await this.usersService.findAll();
    let listUserDto = lista.map(e => ListUserDto.create(e.id, e.name, e.number, e.email));
    return listUserDto;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ListUserDto> {
    const user = await this.usersService.findOne(id);
    return ListUserDto.create(user.id, user.name, user.number, user.email);
  }
  @Get('/search/email')
  async findByEmail(@Query('email') email:string): Promise<ListUserDto>{
    const user = await this.usersService.findByEmail(email);
    return ListUserDto.create(user.id, user.name, user.number, user.email);

  }
  @Post("/send/reset-email")
  async sendEmailResetPassword(@Body() sendEmailDto:SendEmailDto){
    return this.usersService.sendEmailResetPassword(sendEmailDto);
  }
  @Patch("/reset-password")
  async resetPassword(@Query('hash') code:string,@Body() resetPasswordDto:ResetPasswordDto){

    return this.usersService.resetPassword(code,resetPasswordDto);
  }
  @Post('/auth/login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto);
  }
  @Get('/confirm-code/:code')
  async confirmCode(@Param('code') code:string){
    return await this.usersService.validateCodeConfirm(code);

  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  
}
