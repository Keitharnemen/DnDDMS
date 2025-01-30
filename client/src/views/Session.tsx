import { useEffect, useState } from "react";
import { getCampaignName } from "../api/campaignApi";
import SessionList from "../components/Session/SessionList";
import { useNavigate } from "react-router-dom";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";
import ErrorPanel from "../components/Error/ErrorPanel";
import CharacterList from "../components/Characters/CharactersList";

const Sessions = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [playersNum, setPlayersNum] = useState(0);
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const getCampaignsData = async () => {
    const response = await getCampaignName();

    if (response.status === 200) {
      setName(response.data.name);
      setPlayersNum(response.data.playersNum);
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  useEffect(() => {
    getCampaignsData();
  }, []);
  const exitCampaign = () => {
    navigate("/campaigns");
  };
  return (
    <>
      <h1>Kampania: {name}</h1>
      <SidePanelButton />
      <CharacterList playersNum={playersNum} />
      <SessionList />
      <button onClick={() => exitCampaign()}>Wyjdź z kampanii</button>
      {error && (
        <ErrorPanel
          status={error.status}
          message={error.message}
          onClick={() => setError(null)}
        />
      )}
    </>
  );
};

export default Sessions;
