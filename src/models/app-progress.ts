import {Area} from "./area";

export interface AppProgress {
    area?:Area;
    areaName?: string;
    action?: string;
    percentComplete?: number;
    percentCompleteInt?: number;
    report?: string;
    when?: Date;
    whenAgo?: string;
}

