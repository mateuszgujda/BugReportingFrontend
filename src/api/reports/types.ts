import { PagedRequest } from "../shared/types";

export type GetReportInput = { id: string }

export interface BrowseReportsInput extends PagedRequest {
    fromDate : string;
    toDate : string;
    frametime? : number;
    version : string;
    emotion? : string;
    type? : string;
    category? : string;
    hasScreenshot? : boolean
}

export type Report = {
  id: string;
  addedAt: Date;
  comment: string;
  emotion: string;
  reportType: string;
  reportState: string;
  reportCategory: string;
  hasScreenshot: boolean;
  hasSavegame: boolean;
  hasBugfile: boolean;
  version: string;
}

export type CPUMetrics = {
    brand : string;
    chipset : string;
    vendor : string;
    cores : number;
    coresWithHyperthread : number;
    usePercentage : number;
}

export type GPUMetrics = {
    deviceDescription : string;
    providerName : string;
    internalDriverVersion: string;
    userDriverVersion : string;
    driverDate : string;
    RHIName : string;
    brand: string;
}

export type MemoryMetrics = {
    totalMemoryGB : number;
    physicalMemoryAvailableBytes : number;
    virtualMemoryAvailableBytes : number;
    physicalMemoryUsedBytes : number;
    virtualMemoryUsedBytes : number;
}

export type ScreenResolution = {
    width : number,
    height : number
}

export type DiskMetrics = {
    availableSize: number;
    totalSize: number;
}

export type MachineSpec = {
    platform : string;
    cpu : CPUMetrics;
    gpu : GPUMetrics;
    ram : MemoryMetrics;
    disk: DiskMetrics;
    outputDevice : string;
    screenResolution : ScreenResolution;
    language: string;
    locale: string;
    inputType : string;
}





export type ReportDetails = {
    id: string;
    addedAt: Date;
    comment: string;
    emotion: string;
    frameTime: number;
    reportType: string;
    reportState: string;
    reportCategory: string;
    hasScreenshot: boolean;
    hasSavegame: boolean;
    hasBugfile: boolean;
    version: string;
    machineSpecs: MachineSpec;
    screenshotId? : string;
    bugfileId? : string;
    saveIds : Array<string>;
    contactEmail: string;
    allowContact: boolean;
}