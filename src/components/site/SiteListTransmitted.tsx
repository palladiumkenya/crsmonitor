import React, {FC, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

interface Props {
    transmittedSites: Site[]
    loadError: (siteCode: any) => void;
}

const SiteListTransmitted:FC<Props>=({transmittedSites,loadError})=> {

    const handleLoadError = (rowData:any) => {
        loadError(rowData.siteCode);
    }

    const actionBodyTemplate = (rowData:any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-list" className="p-button-rounded p-button-success mr-2" onClick={() => handleLoadError(rowData)} />
            </React.Fragment>
        );
    }

    return (
        <>
            <h2>Transmitted Sites</h2>
            <DataTable value={transmittedSites}>
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="arrivedAgo" header="Uploaded"></Column>
                <Column field="recieved" header="Clients"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="responseAgo" header="Transmitted"></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </>

    )
}

export default SiteListTransmitted;
