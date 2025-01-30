import React, { useEffect, useState } from "react";
import ICharacter from "../../types/characters";
import CharacterTile from "./CharacterTile";
import CharacterForm from "../Forms/CharacterForm";
import {
  addCharacter,
  fetchCharactersForCampaign,
  fetchClasses,
  fetchRaces,
  updateCharacter,
} from "../../api/characterApi";
import ErrorPanel from "../Error/ErrorPanel";
import IClasses from "../../types/classes";
import IRace from "../../types/races";

interface CharacterListProps {
  playersNum: number;
}

// komponent wyświetlający listę postaci w zależności od liczby graczy, jeśli slot na postać nie został zapełniony powinien się wyświetlić pusty kafelek
const CharacterList: React.FC<CharacterListProps> = ({ playersNum }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [scharacter, setSCharacter] = useState<ICharacter | null>(null);
  const [creatingCharacter, setCreatingCharacter] = useState(false);
  const [races, setRaces] = useState<IRace[]>([]);
  const [classes, setClasses] = useState<IClasses[]>([]);
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseR = await fetchRaces();
        if (responseR.status === 200) {
          const r: IRace[] = responseR.data;
          setRaces(r);
        } else {
          setError({
            status: responseR.status,
            message: responseR.data.message || "Unknown",
          });
          return;
        }

        const responseC = await fetchClasses();
        if (responseC.status === 200) {
          const c: IClasses[] = responseC.data;
          setClasses(c);
        } else {
          setError({
            status: responseR.status,
            message: responseC.data.message || "Unknown",
          });
          return;
        }
      } catch (e) {
        setError({ status: 500, message: "Błąd serwera" });
      }
    };
    fetchData();
  }, []);

  const getCharacters = async () => {
    const response = await fetchCharactersForCampaign();
    if (response.status === 200) {
      setCharacters(response.data);
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const handleCharacterSubmit = async (data: ICharacter) => {
    let uCH: ICharacter[];
    if (scharacter) {
      const response = await updateCharacter({ ...data });
      if (response.status === 200) {
        const updatedCharacter: ICharacter = response.data;
        uCH = characters.map((ch) =>
          ch.id === updatedCharacter.id ? updatedCharacter : ch
        );
      } else {
        setError({
          status: response.status,
          message: response.data.message || "Unknown",
        });
        return;
      }
    } else {
      const response = await addCharacter({ ...data });
      if (response.status === 201) {
        const newCharacter: ICharacter = response.data;
        uCH = [...characters, newCharacter];
      } else {
        setError({
          status: response.status,
          message: response.data.message || "Unknown",
        });
        return;
      }
    }

    setCharacters(uCH);
    setCreatingCharacter(false);
    setSCharacter(null);
  };

  const handleCharacterCancel = () => {
    setCreatingCharacter(false);
    setSCharacter(null);
  };
  console.log("Postaci:");
  console.log(characters);

  return (
    <>
      {[...Array(playersNum)].map((_, index) => {
        return (
          <CharacterTile
            key={index}
            character={characters[index] || null}
            races={races}
            classes={classes}
            onClick={() => {
              console.log("sada" + !characters[index]);
              setSCharacter(characters[index] || null);
              setCreatingCharacter(true);
            }}
          />
        );
      })}

      {creatingCharacter && (
        <CharacterForm
          character={scharacter}
          races={races}
          classes={classes}
          onSubmit={handleCharacterSubmit}
          onCancel={handleCharacterCancel}
        />
      )}
      {error && (
        <ErrorPanel
          status={error.status}
          message={error.message}
          onClick={() => setError(null)}
        />
      )}
    </>
  );
};

export default CharacterList;
