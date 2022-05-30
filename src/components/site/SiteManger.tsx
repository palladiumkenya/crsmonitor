import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListPending from "./SiteListPending";

const service=new SiteService();

const SiteManger:FC=()=> {

    const [transmit, setTransmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [pendingSites, setPendingSites] = useState<Site[]>([]);
    const [siteError, setSiteError] = useState<string>('');

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
    }, []);


    const onTransmitSites = async (siteCodes: any[]) => {
        setTransmit(false);

        try {
            await service.generateSiteTransfer();
            await service.transferSites(siteCodes);
            setTransmit(true);
        } catch (e: any) {
            setLoading(false)
            setErrors(error => [...error, `${e.message}`]);
        }
    }

    return (
        <div>
            {loading ? (<span>loading...</span>) : (<span></span>)}
            {errors.map((error) => (<p>{error}</p>))}
            <SiteListPending pendingSites={pendingSites} transmitSites={onTransmitSites}/>
        </div>
    )
}
export default SiteManger;
