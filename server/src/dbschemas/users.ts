import mongoose from "mongoose";
import IUser from "../types/users";

const userSchema = new mongoose.Schema<IUser>({
    id: {type: Number, unique: true, required: true},
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    surname: { type: String, required: false, sparse: true},
    email: { type: String, sparse: true, required: false},
    login: { type: String, required: false, unique: true },
    password: { type: String, required: false, sparse: true},
    isAdmin: {type: Boolean, default: false},
    isMaster: {type: Boolean, default: false}
  });
  
  export const UserModel = mongoose.model<IUser>('Users', userSchema);