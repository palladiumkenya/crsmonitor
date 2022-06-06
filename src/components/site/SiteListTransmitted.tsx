import React, {FC, useRef, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";

interface Props {
    transmittedSites: Site[]
    loadError: (siteCode: any) => void;
    loadingData: boolean
}

const SiteListTransmitted:FC<Props>=({transmittedSites,loadError,loadingData})=> {

    const dt:any = useRef(null);

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

    const leftContents = (
        <React.Fragment>
            <Button  label="Export" icon="pi pi-file" onClick={() => exportCSV()} className="p-button-info" data-pr-tooltip="CSV" />
        </React.Fragment>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    return (
        <>
            <Link to="/manage">Mangage</Link>
            <h2>Transmitted Sites</h2>
            <Toolbar left={leftContents} />
            <DataTable ref={dt} value={transmittedSites} loading={loadingData}  paginator rows={100} sortMode="multiple" responsiveLayout="scroll" dataKey="id"  >
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="county" header="County" sortable></Column>
                <Column field="agency" header="Agency" sortable></Column>
                <Column field="partner" header="Partner" sortable></Column>
                <Column field="arrivedAgo" header="Uploaded" sortable></Column>
                <Column field="recieved" header="Clients" sortable></Column>
                <Column field="activeRecords" header="Active Clients" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
                <Column field="responseAgo" header="Transmitted" sortable></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </>

    )
}

export default SiteListTransmitted;
