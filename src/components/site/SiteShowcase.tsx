import React, {FC, useEffect, useState} from "react";
import SiteService from "../../services/site-service";
import SiteView from "./SiteView";
import {TransmittedSite} from "../../models/transmitted-site";
import {useParams} from "react-router-dom";

const service=new SiteService();

const SiteShowcase:FC=()=> {
    let params = useParams();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [siteError, setSiteError] = useState<TransmittedSite>();

    useEffect(() => {
        (async () => {
            try {
                let res = await service.getTransmittedSiteError(params.siteCode);
                setLoading(false)
                setSiteError(res.data);
            } catch (e: any) {
                setLoading(false)
                setErrors(error => [...error, `${e.message}`]);
            }
        })();
        return () => {
        };
    }, []);

    return (
        <div>
            {loading ? (<span>loading...</span>) : (<span></span>)}
            {errors.map((error) => (<p>{error}</p>))}
            <SiteView transmittedSite={siteError}/>
        </div>
    )
}
export default SiteShowcase;
