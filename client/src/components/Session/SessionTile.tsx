import React from "react";

interface SessionTileProps {
  details: {
    name: string;
    plan: string;
    notes: string;
  };
  sessionID: number;
  onSelect: (
    ID: number,
    details: { name: string; plan: string; notes: string }
  ) => void;
}

const SessionTile: React.FC<SessionTileProps> = ({
  details,
  sessionID,
  onSelect,
}) => {
  return (
    <div onClick={() => onSelect(sessionID, details)} className="session">
      <h3>{details.name}</h3>
    </div>
  );
};

export default SessionTile;
