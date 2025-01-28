import { SessionModel } from "../dbschemas/sessions";
import { Request, Response} from "express";
import { getNextId } from "../utils/idGenerator";

export const getSessions = async (req : Request, res : Response) => {
    const campaignID = req.session.campaignID
    try {
        const campaings = await SessionModel.find({campaignID:campaignID})
        if(campaings.length === 0) return res.status(403).json({message: "Nie ma danych"});
        return res.status(200).json(campaings)
    }
    catch (err) {
        return res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addSession = async (req : Request, res : Response) => {
    const campaignID = req.session.campaignID
    const {name} = req.body


    const newSession = new SessionModel([
        getNextId("sessions"),
        name,
        campaignID,
        Date.now().toString()
    ])

    const saved = await newSession.save()
    res.status(201).json(saved)
}

export const changeSessionID = (req : Request, res: Response) => {
    const sessionID = req.body
    req.session.sessionID = sessionID
    return res.status(200).json({ message: "Session ID ustawione.", sessionID });
}


export const updateSessionData = async (req : Request, res: Response) => {
    const sessionID = req.session.sessionID
    const {plan, notes} = req.body

    const session = await SessionModel.findOne({id: sessionID})
    if (!session) { 
        return res.status(404).json({ message: "Sesja nie została znaleziona" });
      }

    session.plan = plan || session.plan 
    session.notes = notes || session.notes
    await session.save();
    res.status(200).json(session);
}

export const getSessionsDetails = async (req : Request, res : Response) => {
    const sessionID  = req.session.sessionID
    try {
        const session = await SessionModel.findOne({id: sessionID})
        return res.status(200).json(session)
    }
    catch (err) {
        return res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const lockSession = async (req: Request, res: Response) => {
    const sessionID = req.session.sessionID

    const session = await SessionModel.findOne({id: sessionID})
    if (!session) { 
        return res.status(404).json({ message: "Sesja nie została znaleziona" });
      }
    session.endDate = Date.now().toString()
    await session.save();
    return res.status(200).json(session); 
}