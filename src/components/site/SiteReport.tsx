import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListTransmitted from "./SiteListTransmitted";
import {useNavigate } from "react-router-dom";

const service=new SiteService();

const SiteReport:FC=()=> {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [siteError, setSiteError] = useState<string>('');
    const [transmittedSites, setTransmittedSites] = useState<Site[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res = await service.getTransmittedSites();
                setTransmittedSites(res.data)
                setLoading(false)
            } catch (e: any) {
                setLoading(false)
                setErrors(error => [...error, `${e.message}`]);
            }

        })();
        return () => {};
    }, []);

    const onLoadError =  (siteCode: any) => {
        navigate(`/site/${siteCode}`);
    }

    return (
        <div>
            {loading ? (<span>loading...</span>) : (<span></span>)}
            {errors.map((error) => (<p>{error}</p>))}
            <SiteListTransmitted transmittedSites={transmittedSites} loadError={onLoadError}/>
        </div>
    )
}
export default SiteReport;
