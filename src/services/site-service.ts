import {Site} from "../models/site";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {TransmittedSite} from "../models/transmitted-site";
import {SiteDuplicate} from "../models/site-duplicate";
import {ServerInfo} from "../models/server-info";

class SiteService {
    client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_CRS_API_URL
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

    getDuplicateSites(): Promise<AxiosResponse<SiteDuplicate[]>> {
        return this.client.get<SiteDuplicate[]>('/App/DuplicateSummary')
    }

    async generateSiteTransfer(token: string | undefined): Promise<AxiosResponse> {
        if (token) {
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return  this.client.post('/App/Generate');
    }

    transferAllSites(token: string | undefined): Promise<AxiosResponse> {
        if (token) {
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return this.client.post('/App/DumpAll')
    }

    transferSites(siteCodes:number[],token: string | undefined): Promise<AxiosResponse> {
        if (token) {
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        const body={siteCodes}
        return this.client.post<number[]>('/App/DumpSite',body)
    }

    reTransferSites(siteCodes:number[],token: string | undefined): Promise<AxiosResponse> {
        if (token) {
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        const body={siteCodes}
        return this.client.post<number[]>('/App/DumpFailedSite',body)
    }

    deduplcateSites(sites:SiteDuplicate[],token: string | undefined): Promise<AxiosResponse> {
        if (token) {
            this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        const body={sites: sites}
        return this.client.post<number[]>('/App/DeDuplicateSite',body)
    }

    getTransmittedSiteError(siteCode: string | undefined): Promise<AxiosResponse<TransmittedSite>> {
        return this.client.get<TransmittedSite>(`/App/ErrorReport/${siteCode}`)
    }

    getServerInfo(): Promise<AxiosResponse<ServerInfo>> {
        return this.client.get<ServerInfo>('/App/Status')
    }

}

export default SiteService;
