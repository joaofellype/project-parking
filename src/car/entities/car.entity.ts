import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type CarDocument = Car & Document
@Schema({ timestamps:true})
export class Car {

    @Prop()
    model:string;
    @Prop()
    color:string;
    @Prop()
    plate:string;
    @Prop()
    desc:string;
    @Prop()
    user:User;
    @Prop()
    qrcode:string
}
export const CarSchema = SchemaFactory.createForClass(Car);