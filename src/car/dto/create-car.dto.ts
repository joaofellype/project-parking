import { User } from "src/users/entities/user.entity";

export class CreateCarDto {
  
    model:string;
    color:string;
    plate:string;
    desc:string;
    idUser:string;
    user:User;
}
