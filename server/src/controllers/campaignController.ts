import { campaignModel } from "../dbschemas/campaigns";
import { Request, Response} from "express";
import { getNextId } from "../utils/idGenerator";
import { CharacterModel } from "../dbschemas/characters";
import { ClassModel } from "../dbschemas/classes";
import { RaceModel } from "../dbschemas/races";

export const getCampaigns = async (req : Request, res : Response) => {
    try {
        const DMID = req.session.DMID
        if (!DMID) {res.status(401).json({message: 'No Master ID'}); return}

        console.log(DMID)
        const campaings = await campaignModel.find({masterId:DMID})
        if(campaings.length === 0) {res.status(404).json({message: "Nie ma danych"}); return}

        res.status(200).json(campaings)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addCampaigns = async (req : Request, res : Response) => {
    try {
    const {name, playersNum, system} = req.body
    const DMID = req.session.DMID
        if (!DMID){res.status(401).json({message: 'No Master ID'}); return}

    if (!name || !playersNum || !system){res.status(400).json({message: 'Invalid input: no Name, Number of Players or System'}); return}

    const id = await getNextId("campaigns")
    const newCampaign = new campaignModel({
        id: id,
        name,
        system,
        playersNum,
        masterId: DMID
    })

    const saved = await newCampaign.save()
    res.status(201).json(saved)
}
catch (err) {
    res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
}
}

export const changeCampaignID = async (req : Request, res: Response) => {
    try{
    const {campaignID} = req.body
    if (!campaignID) {res.status(400).json({message: 'Invalid input: no campaignID'}); return}

    req.session.campaignID = campaignID
    res.status(200).json({ message: "Campaign ID ustawione.", campaignID });
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }

}

export const getCampaignName = async (req :  Request, res: Response) => {
    try {
    const campaignID = req.session.campaignID
    if (!campaignID){res.status(400).json({message: 'Invalid input: no campaignID'}); return}

    const campaign = await campaignModel.findOne({id: campaignID})
    if(!campaign){res.status(404).json({message: 'No campaign found'}); return}

    res.status(200).json(campaign)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }

}


export const getCharacters = async (req : Request, res : Response) => {
    try {
        const campaignID = req.session.campaignID
    if (!campaignID){res.status(400).json({message: 'Invalid input: no campaignID'}); return}
        const characters = await CharacterModel.find({campaignId: campaignID})
        res.status(200).json(characters)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addCharacter = async (req : Request, res : Response) => {
    try {
    const campaignID = req.session.campaignID
    if (!campaignID){res.status(400).json({message: 'Invalid input: no campaignID'}); return}

    const {character} = req.body
    if(!character) {res.status(400).json({message: 'Invalid input: no character'}); return}

    const id = await getNextId("character")
    const newCharacter = new CharacterModel({
        id: id,
        campaignId: campaignID,
        ...character
})

    const saved = await newCharacter.save()
    res.status(201).json(saved)
}catch (err) {
    res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
}

}

export const updateCharacter = async (req : Request, res : Response) => {
    try{
    const {character} = req.body
    if(!character) {res.status(400).json({message: 'Invalid input: no character'}); return}

    const dbCharacter = await CharacterModel.findOneAndUpdate({id: character.id}, {...character}, {new: true})
    if(!dbCharacter)  {res.status(404).json({message: 'No character found'}); return}
    res.status(200).json(dbCharacter)
    }catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const getRaces = async (req : Request, res : Response) => {
    try {
        const races = await RaceModel.find()
        res.status(200).json(races)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const getClasses = async (req : Request, res : Response) => {
    try {
        const classes = await ClassModel.find()
        res.status(200).json(classes)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}