import { FieldValues } from "react-hook-form";

export interface ReportQueryFormState extends FieldValues {
    startDate: string,
    endDate: string,
    category: string,
    emotion: string,
    issueType: string,
    screenshot: string,
    frametime?: number,
    version: string,
    limit: number
}