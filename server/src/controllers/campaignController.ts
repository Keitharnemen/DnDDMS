import { campaignModel } from "../dbschemas/campaigns";
import { Request, Response} from "express";
import { getNextId } from "../utils/idGenerator";
import { CharacterModel } from "../dbschemas/characters";
import { ClassModel } from "../dbschemas/classes";
import { RaceModel } from "../dbschemas/races";

export const getCampaigns = async (req : Request, res : Response) => {
    const DMID = req.session.DMID
    try {
        const campaings = await campaignModel.find({masterId:DMID})
        if(campaings.length === 0) res.status(404).json({message: "Nie ma danych"});
        res.status(200).json(campaings)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addCampaigns = async (req : Request, res : Response) => {
    const DMID = req.session.DMID
    const {name, playersNum, system} = req.body


    const newCampaign = new campaignModel([
        getNextId("campaigns"),
        name,
        system,
        playersNum,
        DMID
    ])

    const saved = await newCampaign.save()
    res.status(201).json(saved)
}

export const changeCampaignID = (req : Request, res: Response) => {
    const campaignID = req.body
    req.session.campaignID = campaignID
    return res.status(200).json({ message: "Campaign ID ustawione.", campaignID });
}

export const getCampaignName = async (req :  Request, res: Response) => {
    const campaignID = req.session.campaignID
    const campaign = await campaignModel.findOne({id: campaignID})
    res.status(200).json(campaign)
}


export const getCharacters = async (req : Request, res : Response) => {
    try {
        const characters = await CharacterModel.find({campaignId:req.session.campaignID})
        res.status(200).json(characters)
    }
    catch (err) {
        res.status(500).json({message: "Server error: ", error: err instanceof Error ? err.message : err})
    }
}

export const addCharacter = async (req : Request, res : Response) => {
    const {character} = req.body


    const newCharacter = new CharacterModel({
        id: getNextId("character"),
        campaignId: req.session.campaignID,
        ...character
})

    const saved = await newCharacter.save()
    res.status(201).json(saved)
}

export const updateCharacter = async (req : Request, res : Response) => {
    const {character} = req.body

    const dbCharacter = CharacterModel.findOneAndUpdate({id: character.id}, {...character}, {new: true})

    res.status(200).json(dbCharacter)
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