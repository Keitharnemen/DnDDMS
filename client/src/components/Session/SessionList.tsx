import React, { useEffect, useState} from "react";
import SessionTile from "./SessionTile";
import { addSession, fetchSession, setSessionID } from "../../api/sessionApi";
import ISession from "../../types/sessions";
import SessionForm from "../Forms/SessionForm";
import { useNavigate } from "react-router-dom";
import ErrorPanel from "../Error/ErrorPanel";

// lista sesji, podpbnie działająca do listy kampanii
const SessionList : React.FC = () => {
    
    const [Sessions, setSessions] = useState<ISession[]>([])
    const [creatingSession, setCreatingSession] = useState(false)
    const [error, setError] = useState<{status: number, message: string} | null>(null)
    const navigate = useNavigate()  

    const getSessions = async () => {
        const response = await fetchSession() ;
        if (response.status ===  200) { const data : ISession[] = response.data; console.log(data);setSessions(data)}
        else if (response.data.message === "No sessions found") {}
        else {setError({status: response.status, message: response.data.message || 'Unknown'})}
    }

    const postSession = async (name: string) => {
        const response = await addSession(name)
        
        if (response.status ===  201) { const newSession : ISession = response.data; 
            setSessions([...Sessions, newSession])
            setCreatingSession(false)}
        else {setError({status: response.status, message: response.data.message || 'Unknown'})}
    }

    const cancelCreating = () => {
        setCreatingSession(false)
    }

    const handleSelectSession = async (sessionID : number, details: {name : string, plan: string, notes: string}) =>
        {
            const response = await setSessionID(sessionID)
            if (response.status === 200){
            navigate('/campaigns/sessions/details', {state: {name: details.name, plan: details.plan, notes: details.notes}})
            }
            else {setError({status: response.status, message: response.data.message || 'Unknown'})}
        }

    useEffect(() => {
        getSessions();
      }, []);

    return (
        <>
        <div className="session-wrapper">
            {creatingSession ? (
                <SessionForm onSubmit={postSession} onCancel={cancelCreating}/>
            ): (
              <>
              <button id="creating-button" className="session" onClick={() => setCreatingSession(true)}>Stwórz sesję</button>
              {Sessions.length > 0 ? 
                (Sessions.map((session) => ( <SessionTile key={session.id} sessionID={session.id} details={{name: session.name, plan: session.plan, notes: session.notes}} onSelect={handleSelectSession}/>))) : (
                    <p className="emptySession-message">Nie stworzono żadnej sesji</p>
                )
            }
              </>
            )
            }
        </div>
        {error && <ErrorPanel status={error.status} message={error.message} onClick={() => setError(null)}/>}
        </>
    )
}

export default SessionList;
