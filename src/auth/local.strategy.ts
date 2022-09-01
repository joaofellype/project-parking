import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginDto } from "src/users/dto/login-user.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginDto:LoginDto): Promise<any> {
      console.log(loginDto);
      console.log("sldkjsldklskdlskdls")
    const user = await this.authService.validate(loginDto);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}