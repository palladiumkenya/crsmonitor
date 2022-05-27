import React from "react";

const Footer=()=>{
    return (<footer><h4>v{process.env.REACT_APP_CRS_VER} {process.env.REACT_APP_CRS_VER_STAGE}</h4></footer>)
}
export default Footer;
