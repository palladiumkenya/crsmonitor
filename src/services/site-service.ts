import {Site} from "../models/site";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {TransmittedSite} from "../models/transmitted-site";
import UserService from "./user-service";

class SiteService {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL:process.env.REACT_APP_CRS_API_URL
        });
        let userService=new UserService();
        userService.getUser().then(user => {
            if (user && !user.expired) {
                this.client.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
            }
        });

    }

    getPendingSites(): Promise<AxiosResponse<Site[]>> {
        return this.client.get<Site[]>('/App/PendingReport')
    }

    getTransmittedSites(): Promise<AxiosResponse<Site[]>> {
        return this.client.get<Site[]>('/App/TransmissionReport')
    }

    getFailedSites(): Promise<AxiosResponse<Site[]>> {
        return this.client.get<Site[]>('/App/FailedReport')
    }

    async generateSiteTransfer(): Promise<AxiosResponse> {
        return  this.client.post('/App/Generate');
    }

    transferAllSites(): Promise<AxiosResponse> {
        return this.client.post('/App/DumpAll')
    }

    transferSites(siteCodes:number[]): Promise<AxiosResponse> {
        const body={siteCodes}
        return this.client.post<number[]>('/App/DumpSite',body)
    }

    reTransferSites(siteCodes:number[]): Promise<AxiosResponse> {
        const body={siteCodes}
        return this.client.post<number[]>('/App/DumpFailedSite',body)
    }

    getTransmittedSiteError(siteCode: string | undefined): Promise<AxiosResponse<TransmittedSite>> {
        return this.client.get<TransmittedSite>(`/App/ErrorReport/${siteCode}`)
    }
}

export default SiteService;
