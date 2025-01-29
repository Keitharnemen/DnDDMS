import { Request, Response} from "express";
import { UserModel } from "../dbschemas/users";
import bcrypt from 'bcryptjs'
import { getNextId } from "../utils/idGenerator";

export const getUser = async (req :  Request, res: Response) => {
    try{
    const userID = req.session.DMID
    console.log(userID);
    console.log(!userID)
    if (!userID) {res.status(401).json({message: 'No User ID'}); return}
    const user = await UserModel.findOne({id: userID})
    if (!user) {res.status(404).json({ message: "No user found" }); return}
    res.status(200).json(user)
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try{
    const {login, password} = req.body
    console.log(login)
    if(!login || !password) {res.status(400).json({message: 'Invalid input: no login or password' }); return}

    const user = await UserModel.findOne({login : login})
    if (!user) {res.status(404).json({ message: "No user found" }); return}

    const isPassOK = await bcrypt.compare(password, user.password)
    console.log(user.id)
    if (isPassOK){
    res.cookie('roles', JSON.stringify({isAdmin: user.isAdmin, isMaster: user.isMaster}), {httpOnly: false})
    req.session.DMID = user.id
    res.status(200).json({ message: 'Zalogowano pomyślnie!' });
    }
    else {
        res.status(400).json({message: 'Incorrect password'})
    }
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addUser = async (req : Request, res : Response) => {
    try {
    const {name, surname, login, password, isAdmin, isMaster} = req.body
    if(!name || !surname || !login || !password || isAdmin === null || isMaster === null) {res.status(400).json({message: 'Invalid input'}); return}
    const hPassword = await bcrypt.hash(password, 12)
    
    const id = await getNextId("users")
    const newUser = new UserModel({
        id: id,
        name,
        surname,
        login,
        password: hPassword, 
        isAdmin,
        isMaster
    })
    const saved = await newUser.save()
    res.status(201).json(saved)
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const signOutUser = async (req : Request, res: Response) => {
    try{
        res.clearCookie('roles');
    // if (req.session) req.session.destroy((err) => {
    //     if (err) {
    //         res.status(500).json({ message: "Nie udało się wylogować." });
    //       }
    //       res.status(200).json({ message: "Wylogowano pomyślnie." });
    //     })
        if (req.session){
    await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err);  // W razie błędu odrzucamy Promise
            } else {
                resolve();  // W razie sukcesu rozwiązujemy Promise
            }
        });
    });
    res.status(200).json({ message: "Wylogowano pomyślnie." })}
    else {
        res.status(500).json({ message: "Nie udało się wylogować." })
    }
        
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}