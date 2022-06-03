import React, {FC, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

interface Props {
    transmittedSites: Site[]
    loadError: (siteCode: any) => void;
}

const SiteListTransmitted:FC<Props>=({transmittedSites,loadError})=> {

    const handleLoadError = (rowData:any) => {
        loadError(rowData.siteCode);
    }

    const isFailed=(rowData:any):boolean=> {
        return rowData.status == 'Failed';
    }

    const actionBodyTemplate = (rowData:any) => {
        if (isFailed(rowData))
            return (
                <React.Fragment>
                    <Button icon="pi pi-exclamation-circle" className="p-button p-button-danger mr-2"
                            onClick={() => handleLoadError(rowData)}/>
                </React.Fragment>
            );
        return <></>
    }

    return (
        <>
            <Link to="/manage">Mangage</Link>
            <h2>Transmitted Sites</h2>
            <DataTable value={transmittedSites}>
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="county" header="County"></Column>
                <Column field="agency" header="Agency"></Column>
                <Column field="partner" header="Partner"></Column>
                <Column field="arrivedAgo" header="Uploaded"></Column>
                <Column field="recieved" header="Clients"></Column>
                <Column field="activeRecords" header="Active Clients"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="responseAgo" header="Transmitted"></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </>

    )
}

export default SiteListTransmitted;
