import React, { useEffect, useState} from "react";
import SessionTile from "./SessionTile";
import { addSession, fetchSession, setSessionID } from "../../api/sessionApi";
import ISession from "../../types/sessions";
import SessionForm from "../Forms/SessionForm";
import { useNavigate } from "react-router-dom";


const SessionList : React.FC = () => {
    
    const [Sessions, setSessions] = useState<ISession[]>([])
    const [creatingSession, setCreatingSession] = useState(false)
    const navigate = useNavigate()  

    const getSessions = async () => {
        const data = await fetchSession() ; setSessions(data);
    }

    const postSession = async (name: string) => {
        const newSession = await addSession(name)
        setSessions([...Sessions, newSession])
        setCreatingSession(false)
    }

    const cancelCreating = () => {
        setCreatingSession(false)
    }

    const handleSelectSession = async (sessionID : number, details: {name : string, plan: string, notes: string}) =>
        {
            await setSessionID(sessionID)
            navigate('/campaigns/sessions/details', {state: {name: details.name, plan: details.plan, notes: details.notes}})
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
        </>
    )
}

export default SessionList;
