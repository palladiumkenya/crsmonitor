import React, {FC, FormEvent, useEffect, useRef, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {Toolbar} from "primereact/toolbar";
import SiteService from "../../services/site-service";
import {InputText} from "primereact/inputtext";

interface Props {
    transmittedSites: Site[]
    loadError: (siteCode: any) => void;
    loadingData: boolean
}

const service=new SiteService();

const SiteListTransmitted:FC<Props>=({transmittedSites,loadError,loadingData})=> {
    const dt: any = useRef(null);
    const [globalFilter, setGlobalFilter] = useState<string>();

    const handleLoadError = (rowData: any) => {
        loadError(rowData.siteCode);
    }

    const isFailed = (rowData: any): boolean => {
        return rowData.status == 'Failed';
    }

    const actionBodyTemplate = (rowData: any) => {
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
            <Button label="Export" icon="pi pi-file" onClick={() => exportCSV()} className="p-button-info"
                    data-pr-tooltip="CSV"/>
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            <span>
                    <i className="pi pi-search"/>
                     <InputText type="search"
                                onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)}
                                placeholder="Search..." style={{backgroundColor: "white"}}/>
                </span>
        </React.Fragment>
    );


    const exportCSV = () => {
        dt.current.exportCSV();
    }


    return (
        <>
            <Link to="/manage">Manage</Link>
            <h2>Transmitted Sites</h2>
            <Toolbar left={leftContents} right={rightContents}/>
            <DataTable ref={dt} value={transmittedSites} loading={loadingData} globalFilter={globalFilter} paginator
                       rows={100} responsiveLayout="scroll" dataKey="id">
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" filterField="name" header="Name"></Column>
                <Column field="county" header="County" sortable></Column>
                <Column field="agency" header="Agency" sortable></Column>
                <Column field="partner" header="Partner" sortable></Column>
                <Column field="arrivedAgo" header="Uploaded" sortable></Column>
                <Column field="recieved" header="Clients" sortable></Column>
                <Column field="activeRecords" header="Active Clients" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
                <Column field="responseAgo" header="Transmitted" sortable></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '8rem'}}></Column>
            </DataTable>
        </>
    )
}

export default SiteListTransmitted;
