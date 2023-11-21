import { PagedResult } from "../shared/types";
import useFetch from "../../hooks/useFetch";
import { BrowseReportsInput, GetReportInput, Report, ReportDetails } from "./types"
const { REACT_APP_API_URL } = process.env;


export const useGetReport = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
     const { commonFetch, isLoading, data } = useFetch<ReportDetails>({
        url: REACT_APP_API_URL + "/Reports/report",
        method: "GET"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const getReport = (queryParams: GetReportInput) => commonFetch({ queryParams });
   
     return { getReport, isLoading, data };
};

export const useBrowseReports = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
    const { commonFetch, isLoading, data } = useFetch<PagedResult<Report>>({
        url: REACT_APP_API_URL + "/Reports/reports",
        method: "GET"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const browseReports = (queryParams: BrowseReportsInput) => commonFetch({ queryParams});
   
     return { browseReports, isLoading, data };    
}
   
