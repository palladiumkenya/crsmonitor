import React, {FC, useContext, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {UserContext} from "../App";
import {Link} from "react-router-dom";

interface Props {
    pendingSites: Site[];
    transmitSites: (siteCodes: any) => void;
}

const SiteListPending:FC<Props>=({pendingSites,transmitSites})=> {
    const authUser = useContext(UserContext);
    const [selectedSites, setSelectedSites] = useState<any>(null);
    const [transmitLabel, setTransmitLabel] = useState('Transmit Pending');


    const handleTransmit = () => {
        if (selectedSites){
            if (selectedSites.length>0) {
                let siteCodes = selectedSites.map((s:Site) => (s.siteCode));
                setTransmitLabel('Transmitting...')
                transmitSites(siteCodes);
                setTransmitLabel('Transmit Pending')
            }
        }

    }

    const handleSelection = (site:any) => {
        setSelectedSites(site);
    }

    const leftContents = (
        <React.Fragment>
            <Button hidden={!authUser.isAdmin} label="Transmit" icon="pi pi-upload" className="p-button-success" onClick={() => handleTransmit()}/>
        </React.Fragment>
    );

    return (
        <>
            <Link to="/">Home</Link>

            <h2>Pending Sites</h2>
            {pendingSites?.length > 0 &&<Toolbar left={leftContents} />}

            <DataTable value={pendingSites}  dataKey="id"   selectionMode="checkbox" selection={selectedSites}  onSelectionChange={(e) => handleSelection(e.value)}>
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="arrivedAgo" header="Uploaded"></Column>
                <Column field="recieved" header="Clients"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </>
    )
}

export default SiteListPending;
