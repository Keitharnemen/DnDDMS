import React, { useEffect, useState } from "react";
import CampaignTile from "./CampaignTile";
import {fetchCampaigns, addCampaign,setCampaignId} from "../../api/campaignApi";
import ICampaign from "../../types/campaigns";
import CampaignForm from "../Forms/CampaignForm";
import { useNavigate } from "react-router-dom";
import ErrorPanel from "../Error/ErrorPanel";
import "../../styles/Campaigns/campaignListStyles.css"

const CampaignsList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]); // przechowujemy kampanie dla danego DM
  const [creatingCampaign, setCreatingCampaign] = useState(false); //stan pozwalający określić, czy mamy wyświetlić listę kampanii czy formularz do tworzenia
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  /* funkcje pomocniczne używające funkcji z api */
  const getCampaigns = async () => {
    const response = await fetchCampaigns();
    if (response.status === 200) {
      setCampaigns(response.data);
    } else if (response.data.message === "Nie ma danych") {
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  const postCampaign = async (
    name: string,
    system: string,
    playersNum: number
  ) => {
    const response = await addCampaign(name, system, playersNum);
    if (response.status === 201) {
      const newCampaign = response.data;
      setCampaigns([...campaigns, newCampaign]);
      setCreatingCampaign(false);
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  const cancelCreating = () => {
    setCreatingCampaign(false);
  };

  const handleSelectCampaign = async (campaignID: number) => {
    const response = await setCampaignId(campaignID);
    if (response.status === 200) {
      navigate("/campaigns/sessions");
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <>
      <div className="campaign-list">
        {creatingCampaign ? ( // jeśli tworzymy kampanię, to pojawi się formularza, wpp. lista kampanii
          <CampaignForm onSubmit={postCampaign} onCancel={cancelCreating} />
        ) : (
          <>
            <button
              id="creating-button"
              className="action-button"
              onClick={() => setCreatingCampaign(true)}
            >
              Stwórz kampanię
            </button>
            <div className="campaign-list-wrapper">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignTile
                  key={campaign.id}
                  name={campaign.name}
                  campaignID={campaign.id}
                  onSelect={handleSelectCampaign}
                />
              ))
            ) : (
              <p className="emptyCampaign-message">
                Nie stworzono żadnej kampanii
              </p>
            )}
            </div>
          </>
        )}
        {error && (
          <ErrorPanel
            status={error.status}
            message={error.message}
            onClick={() => setError(null)}
          />
        )}
      </div>
    </>
  );
};

export default CampaignsList;
