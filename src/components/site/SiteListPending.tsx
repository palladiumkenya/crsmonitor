import React, {FC, useContext, useRef, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {UserContext} from "../App";
import {Link} from "react-router-dom";
import {FilterMatchMode} from "primereact/api";

interface Props {
    pendingSites: Site[];
    transmitSites: (siteCodes: any) => void;
    loadingData: boolean
}
interface ActionState {
    transmit: {
        label: string
        disabled: boolean
    }
}

const SiteListPending:FC<Props>=({pendingSites,transmitSites,loadingData})=> {
    const authUser = useContext(UserContext);
    const [selectedSites, setSelectedSites] = useState<any>(null);
    const [actionState, setActionState] = useState<ActionState>(
        {
            transmit:
                {
                    label: 'Transmit Pending',
                    disabled: false
                }
        }
    );
    const dt: any = useRef(null);


    const handleTransmit = () => {
        if (selectedSites) {
            if (selectedSites.length > 0) {
                const transmitting:ActionState = {
                    transmit:
                        {
                            label: 'Transmitting...',
                            disabled: true
                        }
                }
                setActionState({...actionState,...transmitting})
                let siteCodes = selectedSites.map((s: Site) => (s.siteCode));
                transmitSites(siteCodes);
                const transmittied:ActionState ={
                    transmit:
                        {
                            label: 'Transmit Pending',
                            disabled: false
                        }
                }
                setActionState({...actionState,...transmittied})
            }
        }

    }

    const handleSelection = (site: any) => {
        setSelectedSites(site);
    }

    const leftContents = (
        <React.Fragment>
            <Button label="Export" icon="pi pi-file" onClick={() => exportCSV()} className="p-button-info"
                    data-pr-tooltip="CSV"/>
            {'   '}
            <Button hidden={!authUser.isAdmin} label={actionState.transmit.label} icon="pi pi-upload" className="p-button-success" disabled={actionState.transmit.disabled}
                    onClick={() => handleTransmit()}/>
        </React.Fragment>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    return (
        <>
            <Link to="/">Home</Link>

            <h2>Pending Sites</h2>
            {pendingSites?.length > 0 && <Toolbar left={leftContents}/>}

            <DataTable ref={dt} value={pendingSites} loading={loadingData} paginator rows={100} sortMode="multiple"
                       responsiveLayout="scroll" dataKey="id" selectionMode="checkbox" selection={selectedSites}
                       onSelectionChange={(e) => handleSelection(e.value)}>
                <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="county" header="County" sortable></Column>
                <Column field="agency" header="Agency" sortable></Column>
                <Column field="partner" header="Partner" sortable></Column>
                <Column field="arrivedAgo" header="Uploaded" sortable></Column>
                <Column field="recieved" header="Clients" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
            </DataTable>
        </>
    )
}

export default SiteListPending;
