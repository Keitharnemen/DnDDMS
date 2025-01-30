import React from "react";
import ICharacter from "../../types/characters";
import IRace from "../../types/races";
import IClasses from "../../types/classes";

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
    <div onClick={() => onClick()} className="character-tile-wrapper">
      {character ? (
        <>
          <h3>
            {character.name} {character.surname}
          </h3>
          <h3>
            {r?.name} {c?.name}
          </h3>
        </>
      ) : (
        <p>Stwórz postać</p>
      )}
    </div>
  );
};

export default CharacterTile;
