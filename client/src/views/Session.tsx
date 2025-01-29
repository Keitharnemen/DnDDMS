import { useEffect, useState } from "react";
import { getCampaignName } from "../api/campaignApi";
import SessionList from "../components/Session/SessionList";
import { useNavigate } from "react-router-dom";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";
import ErrorPanel from "../components/Error/ErrorPanel";

const Sessions = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [error, setError] = useState<{status: number, message: string} | null>(null)
    const getName =  async () => {
        const response = await getCampaignName()
        
        if (response.status ===  200) {setName(response.data.name)}
        else {setError({status: response.status, message: response.data.message || 'Unknown'})}
    }

    useEffect(() =>  {getName()}, [])
    const exitCampaign = () => {
        navigate('/campaigns')
    }
    return (
        <>
        <h1>Kampania: {name}</h1>
        <SidePanelButton/>
        <SessionList/>
        <button onClick={() => exitCampaign()}>Wyjdź z kampanii</button>
        {error && <ErrorPanel status={error.status} message={error.message} onClick={() => setError(null)}/>}
        </>
    )
}

export default Sessions;