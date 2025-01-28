import React, { useEffect, useState} from "react";
import CampaignTile from "./CampaignTile";
import { fetchCampaigns, addCampaign, setCampaignId } from "../../api/campaignApi";
import ICampaign from "../../types/campaigns";
import CampaignForm from "../Forms/CampaignForm";
import { useNavigate } from "react-router-dom";


const CampaignsList : React.FC = () => {
    
    const [campaigns, setCampaigns] = useState<ICampaign[]>([])
    const [creatingCampaign, setCreatingCampaign] = useState(false);
    const navigate = useNavigate()
    
    
    const getCampaigns = async () => {
        const data = await fetchCampaigns() ; setCampaigns(data);
    }

    const postCampaign = async (name: string, system: string, playersNum : number) => {
        const newCampaign = await addCampaign(name, system, playersNum)
        setCampaigns([...campaigns, newCampaign])
        setCreatingCampaign(false)
    }

    const cancelCreating = () => {
        setCreatingCampaign(false)
    }

    const handleSelectCampaign = async (campaignID : number) =>
    {
        await setCampaignId(campaignID)
        navigate('/campaigns/sessions')
    }

    useEffect(() => {
        getCampaigns();
      }, []);

    return (
        <>
        <div className="campaign-list-wrapper">
            {
                creatingCampaign ? (
                    <CampaignForm onSubmit={postCampaign} onCancel={cancelCreating}/>
                ) : (
                    <>
                    <button id="creating-button" className="campaign" onClick={() => setCreatingCampaign(true)}>Stwórz kampanię</button>
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => ( <CampaignTile key={campaign.id} name={campaign.name} campaignID={campaign.id} onSelect={handleSelectCampaign}/>))) : (
                        <p className="emptySession-message">Nie stworzono żadnej kampanii</p>
                    )}
                </>
                )
            }
        </div>
        </>
    )
}

export default CampaignsList;
