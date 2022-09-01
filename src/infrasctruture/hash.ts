
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function hashPassword (password:string) {
    return await bcrypt.hash(password,saltOrRounds);
}
export const matchPassword = async (password:string, hash:string) => {
    return await bcrypt.compare(password,hash);
} 
export const hashString = async () =>{
    return await bcrypt.hash("reset-password",5);
}