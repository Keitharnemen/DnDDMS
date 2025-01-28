import React, { use, useEffect, useState} from "react";
import ICharacter from "../../types/characters";
import CharacterTile from "./CharacterTile";
import CharacterForm from "../Forms/CharacterForm";
import { addCharacter, fetchCharactersForCampaign, updateCharacter } from "../../api/characterApi";

interface CharacterListProps{
    playersNum : number
}

const CharacterList : React.FC<CharacterListProps> = ({playersNum}) => {
    
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const [scharacter, setSCharacter] = useState<ICharacter | null>(null)
    const [creatingCharacter, setCreatingCharacter] = useState(false)

    const getCharacters = async () => {
        const data = await fetchCharactersForCampaign() ; setCharacters(data);
    }

    useEffect(() => {getCharacters()}, [])

    const handleCharacterSubmit = async ( data : ICharacter) =>
    {
        let uCH : ICharacter[];
        if (scharacter) {
            const updatedCharacter = await updateCharacter({...data})
            uCH = characters.map((ch) => ch.id === updatedCharacter.id ? updatedCharacter : ch)
        }
        else {
            const newCharacter  = await addCharacter({...data})
            uCH = [...characters, newCharacter]
        }

        setCharacters(uCH)
        setCreatingCharacter(false)
        setSCharacter(null)
    }

    const handleCharacterCancel = () => {setCreatingCharacter(false); setSCharacter(null)}
    return (
        <>
        {   [...Array(5)].map((_, index) => {
            <CharacterTile 
            character={characters[index] || null}
            onClick={() => {setSCharacter(characters[index] || null); setCreatingCharacter(true)}}/>
        })
        }

        {creatingCharacter && (<CharacterForm character={scharacter} onSubmit={handleCharacterSubmit} onCancel={handleCharacterCancel}/>)}
        </>
    )
}

export default CharacterList;
