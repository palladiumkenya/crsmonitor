import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {InputText} from "primereact/inputtext";
import {ProgressBar} from "primereact/progressbar";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {Area} from "../../models/area";
import {useAuth0} from "@auth0/auth0-react";

interface Props {
    pendingSites: Site[];
    transmitSites: (siteCodes: any) => void;
    transmitAll: () => void;
    loadingData: boolean;
    transmitLabel: string;
    transmitDisabled: boolean;
    transmitAllLabel: string;
    transmitAllDisabled: boolean;
}

const SiteListPending:FC<Props>=({pendingSites,transmitSites,loadingData,transmitLabel,transmitDisabled,transmitAllLabel,transmitAllDisabled,transmitAll})=> {
    const {isAuthenticated} = useAuth0();
    const [selectedSites, setSelectedSites] = useState<any>(null);
    const dt: any = useRef(null);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [transmitting, setTransmitting] = useState<boolean>(false);
    const [genProgress, setGenProgress] = useState<number>(0);
    const [genProgressInfo, setGenProgressInfo] = useState<string>('');
    const [processProgress, setProcessProgress] = useState<number>(0);
    const [processProgressInfo, setProcessProgressInfo] = useState<string>('');
    const [transmitProgress, setTransmitProgress] = useState<number>(0);
    const [transmitProgressInfo, setTransmitProgressInfo] = useState<string>('');

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
                        setTransmitting(true);
                        if (progress.area == Area.Generating) {
                            setGenProgressInfo(progress.report);
                            setGenProgress(progress.percentCompleteInt);
                        }

                        if (progress.area == Area.Processing) {
                            setProcessProgressInfo(progress.report);
                            setProcessProgress(progress.percentCompleteInt);
                        }

                        if (progress.area == Area.Transmitting) {
                            setTransmitProgressInfo(progress.report);
                            setTransmitProgress(progress.percentCompleteInt);
                        }
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const handleTransmitAll = () => {
        transmitAll();
    }

    const handleTransmit = () => {
        if (selectedSites) {
            if (selectedSites.length > 0) {
                let siteCodes = selectedSites.map((s: Site) => (s.siteCode));
                transmitSites(siteCodes);
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
            <Button hidden={!isAuthenticated} label={transmitAllLabel} icon="pi pi-upload" className="p-button-warning"
                    disabled={transmitAllDisabled || transmitting}
                    onClick={() => handleTransmitAll()}/>
            {'   |'}
            <Button hidden={!isAuthenticated} label={transmitLabel} icon="pi pi-upload" className="p-button-success"
                    disabled={transmitDisabled || transmitting}
                    onClick={() => handleTransmit()}/>


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
            <h2>Pending Sites</h2>
            {transmitting &&
                <div>
                    {'Stage 1: '}{genProgressInfo}
                    <ProgressBar value={genProgress} color="yellow"></ProgressBar>
                    <br/>
                    {'Stage 2: '}{processProgressInfo}
                    <ProgressBar value={processProgress} color="yellow"></ProgressBar>
                    <br/>
                    {'Stage 3: '}{transmitProgressInfo}
                    <ProgressBar value={transmitProgress} color="orange"></ProgressBar>
                    <br/>
                </div>
            }

            {pendingSites?.length > 0 && <Toolbar left={leftContents} right={rightContents}/>}

            <DataTable ref={dt} value={pendingSites} loading={loadingData} paginator rows={100} sortMode="multiple"
                       responsiveLayout="scroll" dataKey="id" selectionMode="checkbox" selection={selectedSites}
                       globalFilter={globalFilter}
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
