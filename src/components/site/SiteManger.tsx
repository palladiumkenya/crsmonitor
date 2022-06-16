import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListPending from "./SiteListPending";
import {TabPanel, TabView} from "primereact/tabview";
import {Link} from "react-router-dom";
import SiteListFailed from "./SiteListFailed";

const service=new SiteService();

const SiteManger:FC=()=> {

    const [transmit, setTransmit] = useState(Date.now());
    const [reTransmit, setReTransmit] = useState(Date.now());
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [reTransLoading, setReTransLoading] = useState<boolean>(true);
    const [reTransErrors, setReTransErrors] = useState<string[]>([]);
    const [pendingSites, setPendingSites] = useState<Site[]>([]);
    const [failedSites, setFailedSites] = useState<Site[]>([]);
    const [siteError, setSiteError] = useState<string>('');
    const [transmitLabel, setTransmitLabel] = useState('Transmit Selected');
    const [transmitDisabled, setTransmitDisabled] = useState(false);
    const [transmitAllLabel, setTransmitAllLabel] = useState('Transmit All');
    const [transmitAllDisabled, setTransmitAllDisabled] = useState(false);
    const [reTransmitLabel, setReTransmitLabel] = useState('Re-Transmit Selected');
    const [reTransmitDisabled, setReTransmitDisabled] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res = await service.getPendingSites();
                setPendingSites(res.data)
                setLoading(false)
            } catch (e: any) {
                setLoading(false)
                setErrors(error => [...error, `${e.message}`]);
            }
        })();
        return () => {
        };
    }, [transmit]);

    useEffect(() => {
        (async () => {
            try {
                setReTransLoading(true)
                let res = await service.getFailedSites();
                setFailedSites(res.data)
                setReTransLoading(false)
            } catch (e: any) {
                setReTransLoading(false)
                setReTransErrors(error => [...error, `${e.message}`]);
            }
        })();
        return () => {
        };
    }, [reTransmit]);

    const onTransmitSites = async (siteCodes: any[]) => {
        try {
            setTransmitLabel('Transmitting Selected...');
            setTransmitDisabled(true);
            setTransmitAllDisabled(true);
            await service.generateSiteTransfer();
            await service.transferSites(siteCodes);
            setTransmit(Date.now());
            setTransmitLabel('Transmit Selected');
            setTransmitDisabled(false);
            setTransmitAllDisabled(false);
        } catch (e: any) {
            setLoading(false)
            setErrors(error => [...error, `${e.message}`]);
        }
    }

    const onTransmitAll = async () => {
        try {
            setTransmitAllLabel('Transmitting All...')
            setTransmitAllDisabled(true);
            setTransmitDisabled(true);
            await service.generateSiteTransfer();
            await service.transferAllSites();
            setTransmit(Date.now());
            setTransmitAllLabel('Transmit All');
            setTransmitAllDisabled(false);
            setTransmitDisabled(false);
        } catch (e: any) {
            setLoading(false)
            setErrors(error => [...error, `${e.message}`]);
        }
    }

    const onReTransmitSites = async (siteCodes: any[]) => {
        try {
            setReTransmitLabel('Re-Transmitting Selected...');
            setReTransmitDisabled(true);

            await service.reTransferSites(siteCodes);

            setReTransmit(Date.now());
            setReTransmitLabel('Re-Transmit Selected');
            setReTransmitDisabled(false);
        } catch (e: any) {
            setReTransLoading(false)
            setReTransErrors(error => [...error, `${e.message}`]);
        }
    }

    return (
        <div>

            <Link to="/">Home</Link>
            {loading ? (<span>loading...</span>) : (<span></span>)}
            {errors.map((error) => (<p>{error}</p>))}


            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Pending">
                    <SiteListPending pendingSites={pendingSites} transmitSites={onTransmitSites} loadingData={loading} transmitLabel={transmitLabel} transmitDisabled={transmitDisabled} transmitAllLabel={transmitAllLabel} transmitAllDisabled={transmitAllDisabled} transmitAll={onTransmitAll}/>
                </TabPanel>
                <TabPanel header="Failed">
                    <SiteListFailed failedSites={failedSites} reTransmitSites={onReTransmitSites} loadingData={reTransLoading} reTransmitLabel={reTransmitLabel} reTransmitDisabled={reTransmitDisabled}/>
                </TabPanel>
            </TabView>


        </div>
    )
}
export default SiteManger;
