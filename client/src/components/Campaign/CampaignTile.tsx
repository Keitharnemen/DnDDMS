import React from "react";

interface CampaignTileProps {
    name: string;
    campaignID: number
    onSelect: (ID : number) => void
}

// prosty komponent z nazwą kampani, kliknięcie powinno przenieść do innego widoku
const CampaignTile : React.FC<CampaignTileProps> = ({name, campaignID, onSelect}) => {
    return (
        <div onClick={() => onSelect(campaignID)} className='campaign'>
            <h3>{name}</h3>
        </div>
    )
}

export default CampaignTile