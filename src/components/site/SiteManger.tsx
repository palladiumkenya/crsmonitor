import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListPending from "./SiteListPending";

const service=new SiteService();

const SiteManger:FC=()=> {

    const [transmit, setTransmit] = useState(Date.now());
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [pendingSites, setPendingSites] = useState<Site[]>([]);
    const [siteError, setSiteError] = useState<string>('');
    const [transmitLabel, setTransmitLabel] = useState('Transmit Pending');
    const [transmitDisabled, setTransmitDisabled] = useState(false);

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


    const onTransmitSites = async (siteCodes: any[]) => {
        try {
            setTransmitLabel('Transmitting...');
            setTransmitDisabled(true);
            await service.generateSiteTransfer();
            await service.transferSites(siteCodes);
            setTransmit(Date.now());
            setTransmitLabel('Transmit Pending');
            setTransmitDisabled(false);
        } catch (e: any) {
            setLoading(false)
            setErrors(error => [...error, `${e.message}`]);
        }
    }

    return (
        <div>
            {loading ? (<span>loading...</span>) : (<span></span>)}
            {errors.map((error) => (<p>{error}</p>))}
            <SiteListPending pendingSites={pendingSites} transmitSites={onTransmitSites} loadingData={loading} transmitLabel={transmitLabel} transmitDisabled={transmitDisabled}/>
        </div>
    )
}
export default SiteManger;
