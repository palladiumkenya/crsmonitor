import {Site} from "../models/site";
import axios, {AxiosInstance, AxiosResponse} from "axios";

class SiteService {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL:process.env.REACT_APP_CRS_API_URL
        });
    }

    getPendingSites(): Promise<AxiosResponse<Site[]>> {
        return this.client.get<Site[]>('/App/PendingReport')
    }

    getTransmittedSites(): Promise<AxiosResponse<Site[]>> {
        return this.client.get<Site[]>('/App/TransmissionReport')
    }

    async generateSiteTransfer(): Promise<AxiosResponse> {
        return  this.client.post('/App/Generate');
    }

    transferAllSites(): Promise<AxiosResponse> {
        return this.client.post('/App/DumpAll')
    }

    transferSites(siteCodes:number[]): Promise<AxiosResponse> {
        const body={siteCodes}
        console.log(body);

        return this.client.post<number[]>('/App/DumpSite',body)
    }

}

export default SiteService;
