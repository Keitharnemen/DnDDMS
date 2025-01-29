import { SessionModel } from "../dbschemas/sessions";
import { Request, Response} from "express";
import { getNextId } from "../utils/idGenerator";

export const getSessions = async (req : Request, res : Response) => {
    try {
        const campaignID = req.session.campaignID
        console.log("ID Kampani")
        console.log(campaignID)
        console.log(req.session.campaignID)
        if (!campaignID){res.status(400).json({message: 'Invalid input: no campaignID'}); return}

        const sessions = await SessionModel.find({campaignId:campaignID})
        if(sessions.length === 0){res.status(404).json({message: "No sessions found"}); return}
        res.status(200).json(sessions)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addSession = async (req : Request, res : Response) => {
    try {
    const campaignID = req.session.campaignID
    if (!campaignID){res.status(400).json({message: 'Invalid input: no campaignID'}); return}
    const {name} = req.body
    if(!name) {res.status(400).json({message: 'Invalid input: no name'}); return}

    const id = await getNextId("sessions")
    const newSession = new SessionModel({
        id: id,
        name,
        campaignId: campaignID,
        startDate: Date.now().toString()
    })
    console.log(newSession)
    const saved = await newSession.save()
    res.status(201).json(saved)
} catch (err) {
    res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
}

}

export const changeSessionID = (req : Request, res: Response) => {
    try {
    const {sessionID} = req.body
    if (!sessionID){res.status(400).json({message: 'Invalid input: no sessionId'}); return}

    req.session.sessionID = sessionID
    res.status(200).json({ message: "Session ID ustawione.", sessionID });

    } catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
    
}


export const updateSessionData = async (req : Request, res: Response) => {
    try{
    const sessionID = req.session.sessionID
    if (!sessionID){res.status(400).json({message: 'Invalid input: no sessionId'}); return}
    const {plan, notes} = req.body
    if(!plan || !notes) {res.status(400).json({message: 'Invalid input: no plan or notes'}); return}

    const session = await SessionModel.findOne({id: sessionID})
    if (!session) {res.status(404).json({ message: "No session found" }); return}

    session.plan = plan || session.plan 
    session.notes = notes || session.notes

    console.log(session)
    await session.save();
    res.status(200).json(session);
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const getSessionsDetails = async (req : Request, res : Response) => {
    try {
    const sessionID = req.session.sessionID
    if (!sessionID){res.status(400).json({message: 'Invalid input: no sessionId'}); return}
    
        const session = await SessionModel.findOne({id: sessionID})
        if (!session) {res.status(404).json({ message: "No session found" }); return}
        res.status(200).json(session)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const lockSession = async (req: Request, res: Response) => {
    try {
        const sessionID = req.session.sessionID
        if (!sessionID){res.status(400).json({message: 'Invalid input: no sessionId'}); return}

    const session = await SessionModel.findOne({id: sessionID})
    if (!session) {res.status(404).json({ message: "No session found" }); return}

    session.endDate = Date.now().toString()
    await session.save();
    res.status(200).json(session);
    } catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}