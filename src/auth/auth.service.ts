import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { matchPassword } from '../infrasctruture/hash'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login-user.dto';
@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService, private jwtService: JwtService) { }

    async validate(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (user) {
            console.log(loginDto)
            const ismatch = await matchPassword(loginDto.password,user.password);
            if (ismatch) {
                const { password, ...result } = user;
                return user;
            }
            return null;
        }
        return null;
    }
    async login(loginDto: LoginDto) {
        const user = await this.validate(loginDto);
        if (user == null) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
