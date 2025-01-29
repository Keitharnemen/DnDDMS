import React, { useState } from "react"
import { SidePanel } from "./SidePanel"
import { checkRoles } from "../../utils/cookies"



export const SidePanelButton : React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isAdmin, isMaster} = checkRoles()

    const closePanel = () => setIsOpen(false)

    return (
        <>
        <button onClick={() => setIsOpen(true)}></button>
        <SidePanel isOpen={isOpen} isAdmin={isAdmin} onClose={closePanel}/>
        </>
    )
}