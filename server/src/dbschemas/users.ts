import mongoose from "mongoose";
import IUser from "../types/users";

const userSchema = new mongoose.Schema<IUser>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    surname: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, default: false},
    isMaster: {type: Boolean, default: false}
  });
  
  export const UserModel = mongoose.model<IUser>('Users', userSchema);