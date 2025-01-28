import { useEffect } from "react";
import { getUserName } from "../api/userApi";
import CampaignsList from "../components/Campaign/CampaignsList";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";

const Campaigns = () => {
    let name = ''
    const getName =  async () => {
        const user = await getUserName()
        name = user.name
    }

    useEffect(() =>  {getName()}, [])

    return (
        <>
        <h1>Witaj {name}. Oto Twoje kampanie:</h1>
        <SidePanelButton/>
        <CampaignsList/>
        </>
    )
}

export default Campaigns;