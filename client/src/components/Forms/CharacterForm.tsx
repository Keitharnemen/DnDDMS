import ReactDOM from "react-dom"
import ICharacter from "../../types/characters"
import {useEffect, useMemo, useRef, useState } from "react"
import IRace from "../../types/races"
import IClasses from "../../types/classes"
import { fetchClasses, fetchRaces } from "../../api/characterApi"
import ErrorPanel from "../Error/ErrorPanel"


interface CharacterFormProps {
    character: ICharacter | null
    races: IRace[],
    classes: IClasses[],
    onSubmit: (character : ICharacter)  => void
    onCancel: () => void
};
// formularz dla tworzenia postaci
const CharacterForm: React.FC<CharacterFormProps>= ( {character, races, classes, onSubmit, onCancel}) => {

    const min = 8
    const [error, setError] = useState<{status: number, message: string} | null>(null)
    const [prevHPArgs, setPrevHPArgs] = useState({
        level: 1,
        constitution: 8,
        classID: 0
    });


    const [form, setForm] = useState({
        id: character?.id || 0,
        campaignId: character?.campaignId || 0,
        name: character?.name || '',
        surname: character?.surname || '',
        raceId: character?.raceId || 0,
        classId: character?.classId || 0,
        level: character?.level || 1,
        HP: character?.HP || 0,
        strength: character?.strength || min,
        dexterity: character?.dexterity || min,
        condition: character?.condition || min,
        wisdom: character?.wisdom || min,
        inteligence: character?.inteligence || min,
        charisma: character?.charisma || min
    })

    
    //funkcja liczenia punktów życia przy zmianach niektórych atrybutów
    const calculateHP = (level: number, constitution: number, classId: number, prevHP : number) =>
    {
        let HP = prevHP;
        const constitutionMOD = Math.floor(constitution / 2) - 5 >= 0 ? Math.floor(constitution / 2) - 5 : 0;
        const prevConstitutionMOD =  Math.floor(prevHPArgs.constitution / 2) - 5 >= 0 ? Math.floor(prevHPArgs.constitution / 2) - 5 : 0;
        const cls = classes.find((cls) => (cls.id === classId)) || {id: 0, name: '', cube: 0}


        if (level > prevHPArgs.level)
            {console.log('LEVEL'); HP += Math.floor((Math.random() * cls!.cube + 1)) + constitutionMOD}
        else if (constitutionMOD !== prevConstitutionMOD)
            {console.log('CON'); HP += level}
        else{
            console.log('CLASS');
            HP = cls!.cube + constitutionMOD;
        }
        

        return HP;
    }

    const handleLevelChange = (newLevel: number) =>
    {
        setForm((prev) => {
            const newHP = calculateHP(newLevel, prevHPArgs.constitution, prevHPArgs.classID, prev.HP)
            setPrevHPArgs({level: newLevel, constitution: prev.condition, classID: prev.classId});
            return {
            ...prev,
            level: newLevel,
            HP: newHP
            }
        })
        
    }

    const handleClassChange = (newClassId : number) => {
        

        setForm((prev) => {
            const newHP = calculateHP(prevHPArgs.level, prevHPArgs.constitution, newClassId, prev.HP)
            setPrevHPArgs({level: prev.level, constitution: prev.condition, classID: newClassId});
            return {
            ...prev,
            classId: newClassId,
            HP: newHP
            }
        })
        
    }
    
    const handleRaceChange = (newRaceId : number) => {
        const newRace = races.find((r) => (r.id === newRaceId))
        const oldRace = races.find((r) => (r.id === form.raceId)) || {
            id: 0, name: '', strength: 0, dexterity: 0, condition: 0, wisdom: 0, inteligence: 0, charisma: 0
        }

        
        setForm((prev) => {
            const newCON = prev.condition - oldRace!.condition + newRace!.condition;
            
           const updatedForm = {
            ...prev,
            strength: prev.strength - oldRace!.strength + newRace!.strength,
            dexterity: prev.dexterity - oldRace!.dexterity + newRace!.dexterity,
            condition: newCON,
            wisdom: prev.wisdom - oldRace!.wisdom + newRace!.wisdom,
            inteligence: prev.inteligence - oldRace!.inteligence + newRace!.inteligence,
            charisma: prev.charisma - oldRace!.charisma + newRace!.charisma,
            raceId: newRaceId }
            handleConstitutionChange(newCON);
            return updatedForm;
        })
        
    }

    const handleConstitutionChange = (newConstitution: number) => {
        setForm((prev) => {
            const newHP = calculateHP(prevHPArgs.level, newConstitution, prevHPArgs.classID, prev.HP)
            setPrevHPArgs({level: prev.level, constitution: newConstitution, classID: prev.classId});
            return {
            ...prev,
            condition:newConstitution,
            HP: newHP
            }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(form)
    }

    return ReactDOM.createPortal(
        <>
        <form onSubmit={handleSubmit}>
            <div className="chName-wrapper">
            <label htmlFor="chName">Imię:</label>
            <input 
                name="chName"
                id="chName"
                className="character-form character-input"
                type="text"
                placeholder="Wprowadź imię:" 
                value={form.name}
                onChange={(event) => setForm((prev) => ({...prev, name: event.target.value}))}
                readOnly = {!!character}
                required
                />
            </div>

            <div className="chSurname-wrapper">
            <label htmlFor="chSurname">Nazwisko:</label>
            <input
                name="chSurname"
                id="chSurname"
                className="character-form character-input"
                type="text"
                placeholder="Wprowadź nazwisko:"
                value={form.surname}
                onChange={(e) => setForm((prev) => ({...prev, surname: e.target.value}))}
                readOnly = {!!character}
                required
                />
            </div>

            <div className="chRace-wrapper">
            <label htmlFor="characterRaceInput">Rasa:</label>
            <select
            id = "characterRaceInput"
            className="character-form character-input"
            value={form.raceId}
            onChange={(event) => !character ? handleRaceChange(Number(event.target.value)) : {}}
            required>
                <option value={0} disabled>Wybierz rasę</option>
                {races.map((race) => (
                    <option key={race.id} value={race.id}>{race.name}</option>)
                )}
            </select>
            </div>

            <div className="chClass-wrapper">
            <label htmlFor="characterClassInput">Klasa:</label>
            <select
            id = "characterClassInput"
            className="character-form character-input"
            value={form.classId}
            onChange={(event) => !character ? handleClassChange(Number(event.target.value)) : {}}
            required>
                <option value={0} disabled>Wybierz klasę</option>
                {classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>{classe.name}</option>)
                )}
            </select>
            </div>


            <div className="chLevel-wrapper">
            <label htmlFor="chLevel">Poziom:</label>
            <input
                name="chLevel"
                id="chLevel"
                className="character-form character-input"
                type="number"
                value={form.level}
                onChange={(event) => handleLevelChange(Number(event.target.value))} 
                min={prevHPArgs.level}
                step={1}/>
            </div>

            <div className="chStrength-wrapper">
            <label htmlFor="chStrength">Siła:</label>
            <input
                name="chStrength"
                id="chStrength"
                className="character-form character-input"
                type="number"
                value={form.strength}
                onChange={(event) => setForm((prev) => ({...prev, strength: Number(event.target.value)}))}
                min={min}
                step={1}/>
            </div>

            <div className="chDexterity-wrapper">
            <label htmlFor="chDexterity">Zręczność:</label>
            <input
                name="chDexterity"
                id="chDexterity"
                className="character-form character-input"
                type="number"
                value={form.dexterity}
                onChange={(event) => setForm((prev) => ({...prev, dexterity: Number(event.target.value)}))}
                min={min}
                step={1}/>
            </div>

            <div className="chConstitution-wrapper">
            <label htmlFor="chConstitution">Kondycja:</label>
            <input 
                name="chConstitution"
                id="chConstitution"
                className="character-form character-input"
                type="number"
                value={form.condition}
                onChange={(event) => handleConstitutionChange(Number(event.target.value))}
                min={prevHPArgs.constitution}
                step={1}/>
            </div>

            <div className="chWisdom-wrapper">
            <label htmlFor="chWisdom">Mądrość:</label>
            <input 
                name="chWisdom"
                id="chWisdom"
                className="character-form character-input"
                type="number"
                value={form.wisdom}
                onChange={(event) => setForm((prev) => ({...prev, wisdom: Number(event.target.value)}))}
                min={min}
                step={1}/>
            </div>

            <div className="chInteligence-wrapper">
            <label htmlFor="chInteligence">Inteligencja:</label>
            <input 
                name="chInteligence"
                id="chInteligence"
                className="character-form character-input"
                type="number"
                value={form.inteligence}
                onChange={(event) => setForm((prev) => ({...prev, inteligence: Number(event.target.value)}))}
                min={min}
                step={1}/>
            </div>

            <div className="chCharisma-wrapper">
            <label htmlFor="chCharisma">Charyzma:</label>
            <input 
                name="chCharisma"
                id="chCharisma"
                className="character-form character-input"
                type="number"
                value={form.charisma}
                onChange={(event) => setForm((prev) => ({...prev, charisma: Number(event.target.value)}))}
                min={min}
                step={1}/>
            </div>

            <div className="chHP-wrapper">
            <label htmlFor="chHP">HP:</label>
            <input 
                readOnly
                name="chHP"
                id="chHP"
                className="character-form character-input"
                type="number"
                value={form.HP}/>
            </div>
            
            <button type="submit" name='chSubmitButton' id='chSubmitButton' disabled={form.raceId === 0 || form.classId === 0}  className="character-form character-button">{character ? "Zapisz zmiany" : "Stwórz postać"}</button>
            <button type="button" name='chCancelButton' id='chCancelButton' className="character-form character-button" onClick={onCancel}>Anuluj</button>
        </form>
        {error && <ErrorPanel status={error.status} message={error.message} onClick={() => setError(null)}/>}
        </>, 
        document.body
    )   
}

export default CharacterForm