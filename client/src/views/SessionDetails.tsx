import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  alockSession,
  fetchSessionDetails,
  updateSessionData,
} from "../api/sessionApi";
import { SidePanelButton } from "../components/SidePanel/SidePanelButton";
import ErrorPanel from "../components/Error/ErrorPanel";
import '../styles/Views/sessionDetailsStyles.css'

const SessionsDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);

  const getSessionsDetails = async () => {
    const response = await fetchSessionDetails();
    if (response.status === 200) {
      const data = response.data;
      setPlan(data.plan);
      setNotes(data.notes);
      setName(data.name);
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  useEffect(() => {
    getSessionsDetails();
  }, []);

  const saveData = async () => {
    const response = await updateSessionData(plan, notes);
    if (response.status === 200) {
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  const exitSession = () => {
    navigate("/campaigns/sessions");
  };
  const lockSession = async () => {
    const response = await alockSession();
    if (response.status === 200) {
      navigate("/campaigns/sessions");
    } else {
      setError({
        status: response.status,
        message: response.data.message || "Unknown",
      });
    }
  };

  return (
    <div className="sessionDetails-wrapper">
      <h1>Sesja: {name}</h1>

      <div className="session-details plans-wrapper">
        <label htmlFor="plans-input">Plan ramowy:</label>
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          id="plans-input"
          className="session-details plans"
        />
      </div>

      <div className="session-details plans-wrapper">
        <label htmlFor="notes-input">Notatki:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          id="notes-input"
          className="session-details notes"
        />
      </div>
      <div className="button-wrapper">
      <button type="button" onClick={async () => await saveData()}>
        Zapisz dane
      </button>
      <button type="button" onClick={() => exitSession()}>
        Wyjdź z sesji
      </button>
      <button type="button" onClick={() => lockSession()}>
        Zamknij sesję
      </button>
      </div>
      {error && (
        <ErrorPanel
          status={error.status}
          message={error.message}
          onClick={() => setError(null)}
        />
      )}
    </div>
  );
};

export default SessionsDetails;
