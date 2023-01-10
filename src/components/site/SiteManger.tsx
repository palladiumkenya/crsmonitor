import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListPending from "./SiteListPending";
import {TabPanel, TabView} from "primereact/tabview";
import {Link} from "react-router-dom";
import SiteListFailed from "./SiteListFailed";
import {SiteDuplicate} from "../../models/site-duplicate";
import SiteListDuplicates from "./SiteListDuplicates";
import {useAuth0} from "@auth0/auth0-react";

const service=new SiteService();

const SiteManger:FC=()=> {
    const {isAuthenticated,getAccessTokenSilently} = useAuth0();
    const [transmit, setTransmit] = useState(Date.now());
    const [reTransmit, setReTransmit] = useState(Date.now());
    const [deDuplicate, setDeDuplicate] = useState(Date.now());
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [reTransLoading, setReTransLoading] = useState<boolean>(true);
    const [reTransErrors, setReTransErrors] = useState<string[]>([]);
    const [deDupLoading, setDeDupLoading] = useState<boolean>(true);
    const [deDupErrors, setDeDupErrors] = useState<string[]>([]);
    const [pendingSites, setPendingSites] = useState<Site[]>([]);
    const [failedSites, setFailedSites] = useState<Site[]>([]);
    const [duplicateSites, setDuplicateSites] = useState<SiteDuplicate[]>([]);
    const [siteError, setSiteError] = useState<string>('');
    const [transmitLabel, setTransmitLabel] = useState('Transmit Selected');
    const [transmitDisabled, setTransmitDisabled] = useState(false);
    const [transmitAllLabel, setTransmitAllLabel] = useState('Transmit All');
    const [transmitAllDisabled, setTransmitAllDisabled] = useState(false);
    const [reTransmitLabel, setReTransmitLabel] = useState('Re-Transmit Selected');
    const [reTransmitDisabled, setReTransmitDisabled] = useState(false);
    const [deDupLabel, setDeDupLabel] = useState('De-Duplicate Selected');
    const [deDupDisabled, setDeDupDisabled] = useState(false);
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

    useEffect(() => {
        (async () => {
            try {
                setDeDupLoading(true)
                let res = await service.getDuplicateSites();
                setDuplicateSites(res.data)
                setDeDupLoading(false)
            } catch (e: any) {
                setDeDupLoading(false)
                setDeDupErrors(error => [...error, `${e.message}`]);
            }
        })();
        return () => {
        };
    }, [deDuplicate]);

    const onTransmitSites = async (siteCodes: any[]) => {
        try {
            const accessToken:any = await getAccessTokenSilently()
            setTransmitLabel('Transmitting Selected...');
            setTransmitDisabled(true);
            setTransmitAllDisabled(true);
            await service.generateSiteTransfer(accessToken);
            await service.transferSites(siteCodes,accessToken);
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
            const accessToken:any = await getAccessTokenSilently()
            setTransmitAllLabel('Transmitting All...')
            setTransmitAllDisabled(true);
            setTransmitDisabled(true);
            await service.generateSiteTransfer(accessToken);
            await service.transferAllSites(accessToken);
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
            const accessToken:any = await getAccessTokenSilently()
            setReTransmitLabel('Re-Transmitting Selected...');
            setReTransmitDisabled(true);

            await service.reTransferSites(siteCodes,accessToken);

            setReTransmit(Date.now());
            setReTransmitLabel('Re-Transmit Selected');
            setReTransmitDisabled(false);
        } catch (e: any) {
            setReTransLoading(false)
            setReTransErrors(error => [...error, `${e.message}`]);
        }
    }

    const onDeDuplicateSites = async (sites: any[]) => {
        try {
            const accessToken:any = await getAccessTokenSilently()
            setDeDupLabel('De-Duplicating Selected...');
            setDeDupDisabled(true);

            await service.deduplcateSites(sites,accessToken);

            setDeDuplicate(Date.now());
            setDeDupLabel('De-Duplicate Selected');
            setDeDupDisabled(false);
        } catch (e: any) {
            setDeDupLoading(false)
            setDeDupErrors(error => [...error, `${e.message}`]);
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
                {isAuthenticated &&
                    <TabPanel header="Duplicates">
                    <SiteListDuplicates duplicateSites={duplicateSites} deDuplicateSites={onDeDuplicateSites} loadingData={deDupLoading} deDuplicateLabel={deDupLabel} deDuplicateDisabled={deDupDisabled}/>
                    </TabPanel>
                }
            </TabView>

        </div>
    )
}
export default SiteManger;
