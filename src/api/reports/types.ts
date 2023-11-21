import { PagedRequest } from "../shared/types";

export type GetReportInput = { id: string }

export interface BrowseReportsInput extends PagedRequest {
    fromDate : string;
    toDate : string;
    frametime? : number;
    version : string;
    emotion? : string;
    type? : string;
    hasScreenshot? : boolean
}

export type Report = {
  id: string;
  addedAt: Date;
  comment: string;
  emotion: string;
  frameTime: number;
  reportType: string;
  reportState: string;
  hasScreenshot: boolean;
  hasSavegame: boolean;
  version: string;
}


export type MachineSpec = {
    platform : string;
    cpu : string;
    gpu : string;
    ram : string;
    motherboard : string;
    outputDevice : string;
    viewportDevice : string;
    inputDevice : string;
}

export type ReportDetails = {
    id: string;
    addedAt: Date;
    comment: string;
    emotion: string;
    frameTime: number;
    reportType: string;
    reportState: string;
    hasScreenshot: boolean;
    hasSavegame: boolean;
    version: string;
    machineSpecs: MachineSpec;
    screenshotId? : string;
    saveIds : Array<string>;
    contactEmail: string;
    allowContact: boolean;
}