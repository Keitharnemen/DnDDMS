import React from "react";
import ICharacter from "../../types/characters";
import IRace from "../../types/races";
import IClasses from "../../types/classes";
import '../../styles/Characters/characterTileStyles.css'

interface SessionTileProps {
  character: ICharacter | null;
  races: IRace[];
  classes: IClasses[];
  onClick: () => void;
}

const CharacterTile: React.FC<SessionTileProps> = ({
  character,
  races,
  classes,
  onClick,
}) => {
  const r = races.find((race) => race.id === character?.raceId);
  const c = classes.find((cls) => cls.id === character?.classId);
  return (
    <div onClick={() => onClick()} className="character-tile">
      {character ? (
        <>
          <h4 className="header">
            {character.name} {character.surname}
          </h4>
          <h4 className="header">
            {r?.name} {c?.name}
          </h4>
        </>
      ) : (
        <p>Stwórz postać</p>
      )}
    </div>
  );
};

export default CharacterTile;
