import {counterModel} from "../dbschemas/counter"

export const getNextId = async (nameCollection : string) : Promise<number> => {
    const result = await counterModel.findOneAndUpdate(
        {nameCollection: nameCollection},
        {$inc: {lastID: 1}},
        {new :true, upsert: true}
    )
    return result.lastID
}