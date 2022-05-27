import {TransmissionLog} from "./transmission-log";

export interface TransmittedSite {
    siteCode?: number;
    name?: string;
    records?: number;
    activeRecords?: number;
    transmissionLogs?: TransmissionLog[];
}
