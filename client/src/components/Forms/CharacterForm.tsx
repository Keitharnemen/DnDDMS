import ReactDOM from "react-dom"
import ICharacter from "../../types/characters"
import {useEffect, useMemo, useRef, useState } from "react"
import IRace from "../../types/races"
import IClasses from "../../types/classes"
import { fetchClasses, fetchRaces } from "../../api/characterApi"


interface CharacterFormProps {
    character: ICharacter | null
    onSubmit: (character : ICharacter)  => void
    onCancel: () => void
};

const CharacterForm: React.FC<CharacterFormProps>= ( {character, onSubmit, onCancel}) => {

    const min = 8
    const [races, setRaces] = useState<IRace[]>([])
    const [classes, setClasses] = useState<IClasses[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
            const r = await fetchRaces()
            const c = await fetchClasses()
            setRaces(r)
            setClasses(c)
            }
            catch (e) {console.error("Error fetching classes or races", e)}
            fetchData();
        }},[])


    const [form, setForm] = useState({
        id: character?.id || 0,
        campaignId: character?.campaignId || 0,
        name: character?.name || '',
        surname: character?.surname || '',
        raceId: character?.raceId || 0,
        classId: character?.classId || 0,
        level: character?.level || 1,
        HP: character?.HP || 10,
        STR: character?.STR || min,
        DEX: character?.DEX || min,
        CON: character?.CON || min,
        WIS: character?.WIS || min,
        INT: character?.INT || min,
        CHA: character?.CHA || min
    })

    const prevHPArgs = useRef({
        level: form.level,
        constitution: form.CON,
        classID: form.classId
    })
    
    const calculateHP = useMemo(() =>
    {
        let HP = form.HP;
        const constitutionMOD = Math.floor(form.CON / 2) - 5;
        const cls = classes.find((cls) => (cls.id === form.classId))

        if (form.level !== prevHPArgs.current.level)
            HP += (Math.random() * cls!.cube + 1) + constitutionMOD
        else if (constitutionMOD !== Math.floor(prevHPArgs.current.constitution / 2) - 5)
            HP += form.level
        else
            HP = cls!.cube;

        prevHPArgs.current = {
        level: form.level,
        constitution: form.CON,
        classID: form.classId,
        };

        return HP;
    }, [form.classId, form.CON, form.level])

    const handleLevelChange = (newLevel: number) =>
    {
        setForm((prev) => ({
            ...prev,
            level: newLevel,
            HP: calculateHP
        }))
    }

    const handleClassChange = (newClassId : number) => {
        
        setForm((prev) => ({
            ...prev,
            classId: newClassId,
            HP: calculateHP
        }))
    }
    
    const handleRaceChange = (newRaceId : number) => {
        const newRace = races.find((r) => (r.id === newRaceId))
        const oldRace = races.find((r) => (r.id === form.raceId))

        setForm((prev) => ({
            ...prev,
            STR: prev.STR - oldRace!.strength + newRace!.strength,
            DEX: prev.DEX - oldRace!.dexterity + newRace!.dexterity,
            CON: prev.CON - oldRace!.condition + newRace!.condition,
            WIS: prev.WIS - oldRace!.wisdom + newRace!.wisdom,
            INT: prev.INT - oldRace!.inteligence + newRace!.inteligence,
            CHA: prev.CHA - oldRace!.charisma + newRace!.charisma,
            raceId: newRaceId
        }))
    }

    const handleConstitutionChange = (newConstitution: number) => {
        setForm((prev) => ({
            ...prev,
            CON:newConstitution,
            HP: calculateHP
        }))
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
                <option value='' disabled>Wybierz rasę</option>
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
                <option value='' disabled>Wybierz klasę</option>
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
                min={prevHPArgs.current.level}
                step={1}/>
            </div>

            <div className="chStrength-wrapper">
            <label htmlFor="chStrength">Siła:</label>
            <input
                name="chStrength"
                id="chStrength"
                className="character-form character-input"
                type="number"
                value={form.STR}
                onChange={(event) => setForm((prev) => ({...prev, STR: Number(event.target.value)}))}
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
                value={form.DEX}
                onChange={(event) => setForm((prev) => ({...prev, DEX: Number(event.target.value)}))}
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
                value={form.CON}
                onChange={(event) => handleConstitutionChange(Number(event.target.value))}
                min={prevHPArgs.current.constitution}
                step={1}/>
            </div>

            <div className="chWisdom-wrapper">
            <label htmlFor="chWisdom">Mądrość:</label>
            <input 
                name="chWisdom"
                id="chWisdom"
                className="character-form character-input"
                type="number"
                value={form.WIS}
                onChange={(event) => setForm((prev) => ({...prev, WIS: Number(event.target.value)}))}
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
                value={form.INT}
                onChange={(event) => setForm((prev) => ({...prev, INT: Number(event.target.value)}))}
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
                value={form.CHA}
                onChange={(event) => setForm((prev) => ({...prev, CHA: Number(event.target.value)}))}
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
            
            <button type="submit" name='chSubmitButton' id='chSubmitButton' className="character-form character-button">{character ? "Zapisz zmiany" : "Stwórz postać"}</button>
            <button type="button" name='chCancelButton' id='chCancelButton' className="character-form character-button" onClick={onCancel}>Anuluj</button>
        </form>
        </>, 
        document.body
    )   
}

export default CharacterForm