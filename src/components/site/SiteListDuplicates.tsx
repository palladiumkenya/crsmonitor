import React, {FC, FormEvent, useEffect, useRef, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {InputText} from "primereact/inputtext";
import {ProgressBar} from "primereact/progressbar";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {Area} from "../../models/area";
import {SiteDuplicate} from "../../models/site-duplicate";
import {useAuth0} from "@auth0/auth0-react";

interface Props {
    duplicateSites: SiteDuplicate[];
    deDuplicateSites: (site: any) => void;
    loadingData: boolean;
    deDuplicateLabel: string;
    deDuplicateDisabled: boolean
}

const SiteListDuplicates:FC<Props>=({duplicateSites,deDuplicateSites,loadingData,deDuplicateLabel,deDuplicateDisabled})=> {
    const {isAuthenticated} = useAuth0();
    const [selectedSites, setSelectedSites] = useState<any>(null);
    const dt: any = useRef(null);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [deDuplicating, setDeDuplicating] = useState<boolean>(false);
    const [genProgress, setGenProgress] = useState<number>(0);
    const [genProgressInfo, setGenProgressInfo] = useState<string>('');
    const [processProgress, setProcessProgress] = useState<number>(0);
    const [processProgressInfo, setProcessProgressInfo] = useState<string>('');
    const [deDuplicateProgress, setDeDuplicateProgress] = useState<number>(0);
    const [deDuplicateProgressInfo, setDeDuplicateProgressInfo] = useState<string>('');

    const [connection, setConnection] = useState<null | HubConnection>(null);


    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_CRS_HUB_URL}/transmissionhub`)
            .configureLogging(LogLevel.Error)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("DisplayProgress", (progress) => {
                        setDeDuplicating(true);
                        if (progress.area == Area.Deduplicating) {
                            setDeDuplicateProgressInfo(progress.report);
                            setDeDuplicateProgress(progress.percentCompleteInt);
                        }
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const handleDeDuplicate = () => {
        if (selectedSites) {
            if (selectedSites.length > 0) {
                deDuplicateSites(selectedSites);
            }
        }
    }

    const handleSelection = (site: any) => {
        setSelectedSites(site);
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const leftContents = (
        <React.Fragment>
            <Button label="Export" icon="pi pi-file" onClick={() => exportCSV()} className="p-button-info"
                    data-pr-tooltip="CSV"/>
            {'   |'}
            <Button hidden={!isAuthenticated} label={deDuplicateLabel} icon="pi pi-upload" className="p-button-success"
                    disabled={deDuplicateDisabled || deDuplicating}
                    onClick={() => handleDeDuplicate()}/>
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


    return (
        <>
            <h2>Duplicate Sites</h2>
            {deDuplicating &&
                <div>
                    {deDuplicateProgressInfo}
                    <ProgressBar value={deDuplicateProgress} color="orange"></ProgressBar>
                    <br/>
                </div>
            }

            {duplicateSites?.length > 0 && <Toolbar left={leftContents} right={rightContents}/>}

            <DataTable ref={dt} value={duplicateSites} loading={loadingData} paginator rows={100} sortMode="multiple"
                       responsiveLayout="scroll" dataKey="siteCode" selectionMode="checkbox" selection={selectedSites}
                       globalFilter={globalFilter}
                       onSelectionChange={(e) => handleSelection(e.value)}>
                <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
                <Column field="siteCode" header="MFL Code"></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="total" header="Total" sortable></Column>

            </DataTable>
        </>
    )
}

export default SiteListDuplicates;
