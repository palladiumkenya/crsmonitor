import React, {FC, useEffect, useState} from "react";
import SiteList from "./SiteList";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import {Cipher} from "crypto";

const service=new SiteService();

const SiteManger:FC=()=> {
    const [transmit, setTransmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [pendingSites, setPendingSites] = useState<Site[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res = await service.getPendingSites();
                setPendingSites(res.data)
                setLoading(false)
            }catch (e:any) {
                setLoading(false)
                setErrors( error => [...error, `${e.message}`]);
            }
        })();
        return () => {};
    }, [transmit]);

    const [transmittedSites, setTransmittedSites] = useState<Site[]>([]);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res = await service.getTransmittedSites();
                setTransmittedSites(res.data)
                setLoading(false)
            }catch (e:any) {
                setLoading(false)
                setErrors( error => [...error, `${e.message}`]);
            }

        })();
        return () => {};
    }, [transmit]);


    const onTransmitSites=async (siteCodes:any[]) => {
        setTransmit(false);
        siteCodes.map((s)=>(console.log('TRANSMITTING',s)));

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
            {loading?(<span>loading...</span>):(<span></span>)}
            {errors.map((error)=>(<p>{error}</p>))}
           <SiteList pendingSites={pendingSites} transmittedSites={transmittedSites} transmitSites={onTransmitSites} />
        </div>
    )
}

export default SiteManger;
