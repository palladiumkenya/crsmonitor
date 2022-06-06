import React, {FC, useEffect, useState} from "react";
import {Site} from "../../models/site";
import SiteService from "../../services/site-service";
import SiteListTransmitted from "./SiteListTransmitted";
import {useNavigate } from "react-router-dom";
import {FilterMatchMode} from "primereact/api";

const service=new SiteService();

const SiteReport:FC=()=> {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [siteError, setSiteError] = useState<string>('');
    const [transmittedSites, setTransmittedSites] = useState<Site[]>([]);
    const [filtersData, setFiltersData] = useState({
        'siteCode': { value: '', matchMode: FilterMatchMode.EQUALS },
        'name': { value: '', matchMode: FilterMatchMode.CONTAINS },
        'county': { value: '', matchMode: FilterMatchMode.CONTAINS },
        'agency': { value: '', matchMode: FilterMatchMode.CONTAINS },
        'partner': { value: '', matchMode: FilterMatchMode.EQUALS }
    });


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
            <SiteListTransmitted transmittedSites={transmittedSites} loadError={onLoadError} loadingData={loading}/>
        </div>
    )
}
export default SiteReport;
