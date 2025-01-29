import React from "react";
import ICharacter from "../../types/characters";

interface SessionTileProps {
    character: ICharacter | null
    onClick: () => void
}


const CharacterTile : React.FC<SessionTileProps> = ({character, onClick}) => {
    return (
        <div onClick={() => onClick()} className='character-tile-wrapper'>
            {character ? (
            <>
            <h3>{character.name} {character.surname}</h3>
            <h3>{character.raceId} {character.classId}</h3>
            </>
            ) : (
                <p>Stwórz postać</p>
            )}
            
        </div>
    )
}

export default CharacterTile