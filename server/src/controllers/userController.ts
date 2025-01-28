import { Request, Response} from "express";
import { UserModel } from "../dbschemas/users";
import bcrypt from 'bcrypt'
import { getNextId } from "../utils/idGenerator";

export const getUser = async (req :  Request, res: Response) => {
    const userID = req.session.DMID
    const user = await UserModel.findOne({id: userID})
    res.status(200).json(user)
}

export const loginUser = async (req: Request, res: Response) => {
    const {login, password} = req.body

    const user = await UserModel.findOne({login : login})
    if (!user) {
        return res.status(401).json({ message: 'Niepoprawny login lub hasło.' });
      }

    const isPassOK = await bcrypt.compare(password, user.password)
    res.cookie('roles', JSON.stringify({isAdmin: user.isAdmin, isMaster: user.isMaster}), {httpOnly: false})
    req.session.DMID = user.id
    res.status(200).json({ message: 'Zalogowano pomyślnie!' });

}

export const addUser = async (req : Request, res : Response) => {
    const {name, surname, login, password, isAdmin, isMaster} = req.body
    const hPassword = await bcrypt.hash(password, 12)
    
    const newUser = new UserModel([
        getNextId("users"),
        name,
        surname,
        login,
        hPassword, 
        isAdmin,
        isMaster
    ])
    const saved = await newUser.save()
    res.status(201).json(saved)
}

export const signOutUser = async (req : Request, res: Response) => {
    res.clearCookie('roles');
    if (req.session) req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Nie udało się wylogować." });
          }
          return res.status(200).json({ message: "Wylogowano pomyślnie." });
        })
}