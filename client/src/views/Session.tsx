import { useEffect } from "react";
import { getCampaignName } from "../api/campaignApi";
import SessionList from "../components/Session/SessionList";
import { useNavigate } from "react-router-dom";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";

const Sessions = () => {
    const navigate = useNavigate()
    let name = ''
    const getName =  async () => {
        const campaign = await getCampaignName()
        name = campaign.name
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
        </>
    )
}

export default Sessions;