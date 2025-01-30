import { useEffect, useState } from "react";
import { getUserName } from "../api/userApi";
import CampaignsList from "../components/Campaign/CampaignsList";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";
import IUser from "../types/users";
import ErrorPanel from "../components/Error/ErrorPanel";

const Campaigns = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const getName = async () => {
    const response = await getUserName();
    if (response.status === 200) {
      const user: IUser = response.data;
      setName(user.name + " " + user.surname);
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1 className="header">Witaj {name}. Oto Twoje kampanie:</h1>
      <SidePanelButton />
      <CampaignsList />
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

export default Campaigns;
