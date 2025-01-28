import { useEffect, useState } from "react";   
import { useLocation, useNavigate } from "react-router-dom";
import { alockSession, fetchSessionDetails, updateSessionData } from "../api/sessionApi";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";

const SessionsDetails = () => {
    
    
    const navigate = useNavigate()
    const  [plan, setPlan] = useState<string>('')
    const  [notes, setNotes] = useState<string>('')
    let name = ''

    const getSessionsDetails = async () => {
        const data = await fetchSessionDetails();
        setPlan(data.plan)
        setNotes(data.notes)
        name = data.name
    }

    useEffect(() => {
        getSessionsDetails();
      }, []);

    const saveData = async () => {
        await updateSessionData(plan, notes)
    }

    const exitSession = () => {
        navigate('/campaigns/sessions')
    }
    const lockSession = async () => {
        await alockSession()
        navigate('/campaigns/sessions')
    }

    return (
        <>
        <SidePanelButton/>
        <h1>Sesja : {name}</h1>
        
        <div className="session-details plans-wrapper">
        <label htmlFor="plans-input">Plan ramowy:</label>
        <textarea value={plan} onChange={(e) => setPlan(e.target.value)} id="plans-input" className="session-details plans" />
        </div>
        
        <div className="session-details plans-wrapper">
        <label htmlFor="notes-input">Notatki:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} id="notes-input" className="session-details notes" />
        </div>

        <button type="button" onClick={async () => await saveData()}>Zapisz dane</button>
        <button type="button" onClick={() => exitSession()}>Wyjdź z sesji</button>
        <button type="button" onClick={() => lockSession()}>Zamknij sesję</button>
        
        </>
    )
}

export default SessionsDetails;