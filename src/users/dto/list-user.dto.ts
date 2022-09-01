import { ApiProperty } from "@nestjs/swagger";

export class ListUserDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    number: string;
    @ApiProperty()
    email: string;

    constructor( id: string,name:string,number: string,email: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.number = number;
    }
    public static create(id: string,name:string,number: string,email: string){
        return new ListUserDto(id,name,number,email);
    }

}