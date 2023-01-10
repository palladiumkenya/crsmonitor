import React, {useEffect, useState} from "react";
import {ServerInfo} from "../../models/server-info";
import SiteService from "../../services/site-service";

const service = new SiteService();

const Footer = () => {

    const [serverInfo, setServerInfo] = useState<ServerInfo>({
        version: 'connecting...', status: 'not connected'
    });

    useEffect(() => {
        (async () => {
            try {
                let res = await service.getServerInfo();
                setServerInfo(res.data)
            } catch (e: any) {
                console.error(e);
            }
        })();
        return () => {
        };
    }, []);

    return (<footer><h4>v{process.env.REACT_APP_CRS_VER} {process.env.REACT_APP_CRS_VER_STAGE} |
        Server:{serverInfo?.version} Status:{serverInfo.status}</h4></footer>)
}
export default Footer;
