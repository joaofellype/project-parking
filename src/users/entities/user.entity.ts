
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaType } from "mongoose";


export type UserDocumet = User & Document
@Schema({ timestamps:true})
export class User {   
    id:string;
    @Prop()
    name:string
    @Prop() 
    number: string;
    @Prop() 
    email: string;
    @Prop() 
    password: string;
    @Prop({default:false})
    status:boolean;
    @Prop()
    codeactivation:string;
    @Prop()
    dateChangePassword: Date;
    @Prop()
    hashResetPassword:string;
}
export const UserSchema = SchemaFactory.createForClass(User);