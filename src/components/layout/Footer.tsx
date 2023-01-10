import React, {useEffect, useState} from "react";
import {Site} from "../../models/site";
import {ServerInfo} from "../../models/server-info";
import SiteService from "../../services/site-service";
import {useAuth0} from "@auth0/auth0-react";

const service = new SiteService();
const Footer = () => {



    const [serverInfo, setServerInfo] = useState<ServerInfo>({
        version: 'connecting...', status: 'not connected'
    });




    return (<footer><h4>v{process.env.REACT_APP_CRS_VER} {process.env.REACT_APP_CRS_VER_STAGE} |
        Server:{serverInfo?.version} Status:{serverInfo.status}</h4></footer>)
}
export default Footer;
