import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    name:string
    number: string;
    @IsEmail()
    email: string;
    password: string;
    passwordConfirm:string;
    codeactivation:string
}
