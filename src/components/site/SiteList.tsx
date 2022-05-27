import React, {FC, useState} from "react";
import {Site} from "../../models/site";

interface Props {
    pendingSites: Site[];
    transmittedSites: Site[];
    transmitSites: (siteCodes: any) => void;
}

const SiteList:FC<Props>=({pendingSites,transmittedSites,transmitSites})=> {
    const [transmitLabel, setTransmitLabel] = useState('Transmit Pending');

    const handleTransmit = (sites: Site[]) => {
        if (sites.length>0) {
            let siteCodes = sites.map((s) => (s.siteCode));
            setTransmitLabel('Transmitting...')
            transmitSites(siteCodes);
            setTransmitLabel('Transmit Pending')
        }
    }

    return (
        <>
            <h2>Pending Sites</h2>
            <ul>
                {pendingSites.map((site: Site) => (
                    <li key={site.id}>{site.name}</li>
                ))}
            </ul>

            {pendingSites?.length > 0 && <button onClick={() => handleTransmit(pendingSites)}>{transmitLabel}</button>}

            <h2>Transmitted Sites</h2>
            <ul>
                {transmittedSites.map((site: Site) => (
                    <li key={site.id}>{site.name}</li>
                ))}
            </ul>
        </>
    )
}

export default SiteList;
