import React, { useState } from "react";
import { SidePanel } from "./SidePanel";
import { checkRoles } from "../../utils/cookies";

export const SidePanelButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isMaster } = checkRoles();

  const closePanel = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <img src="sidePanel.png" alt="Panel boczny" width="24" height="24" />
      </button>
      <SidePanel isOpen={isOpen} isAdmin={isAdmin} onClose={closePanel} />
    </>
  );
};
