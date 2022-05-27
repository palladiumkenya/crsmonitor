import React, {FC, useState} from "react";
import {Site} from "../../models/site";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {TransmittedSite} from "../../models/transmitted-site";
import {Link} from "react-router-dom";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";

interface Props {
    transmittedSite ?:TransmittedSite;
}

const SiteView:FC<Props>=({transmittedSite})=> {
    const siteName=()=>
    {
        return `${transmittedSite?.siteCode} | ${transmittedSite?.name}`
    }
    return (
        <>
            <Link to="/">Home</Link>

            <Card title="Facility Details" subTitle={siteName}>
                Total Clients :{transmittedSite?.records}
                <br/>
                Active  Clients :{transmittedSite?.activeRecords}
                <Divider />

                <Panel header="Error Details">
                    <ul>
                        {transmittedSite?.transmissionLogs?.map((e,index)=>(
                            <li key={index}>{e.responseInfo}</li>
                        ))}
                    </ul>
                </Panel>
            </Card>
        </>
    )
}

export default SiteView;
