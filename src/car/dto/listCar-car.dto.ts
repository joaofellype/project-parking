import { ListUserDto } from "src/users/dto/list-user.dto";

export class ListCarDto{
    model:string;
    color:string;
    plate:string;
    desc:string;
    user:ListUserDto;

    constructor(model:string,color:string,plate:string,desc:string,user:ListUserDto){
        this.model = model;
        this.color = color;
        this.plate = plate;
        this.desc = desc;
        this.user = user;
    }
    public static create(model:string,color:string,plate:string,desc:string,user:ListUserDto){
        return new ListCarDto(model,color,plate,desc,user);
    }
}