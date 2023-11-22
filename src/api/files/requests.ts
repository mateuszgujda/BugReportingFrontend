import useFetch from "../../hooks/useFetch";
import { FileInfo, GetFile, GetFileInfo, GetSubdirectoryFiles, GetSubdirectoryInfo } from "./types";


const { REACT_APP_API_URL } = process.env;


export const useFilesInfoSubdirectory = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
     const { commonFetch, isLoading, data } = useFetch<Array<FileInfo>>({
        url: REACT_APP_API_URL + "/Files/file/subdirectory/info",
        method: "GET"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const queryFilesInfoSubdirectory = (query: GetSubdirectoryInfo) => commonFetch({ queryParams: query});
   
     return { queryFilesInfoSubdirectory, isLoading, data };
};

export const useFilesSubdirectory = () => {
   // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
   // This really helps to flesh out the quality of life for the API and is part
   // of creating something that is self documenting. We put Supplier because we know
   // that is what this endpoint will always return. 
    const { commonFetch, isLoading, data } = useFetch<Blob>({
       url: REACT_APP_API_URL + "/Files/file/subdirectory",
       method: "GET"
    });
  
    // using typescript to define the input here means no mistakes can be
    // made downstream when actually using our API layer
    const queryFilesSubdirectory = (query: GetSubdirectoryFiles) => commonFetch({ queryParams: query, fetchOptions: { responseType: 'blob' }});
  
    return { queryFilesSubdirectory, isLoading, data };
};

export const useFileInfo = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
     const { commonFetch, isLoading, data } = useFetch<FileInfo>({
        url: REACT_APP_API_URL + "/Files/file/info",
        method: "GET"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const getFileInfo = (query: GetFileInfo) => commonFetch({ queryParams: query});
   
     return { getFileInfo, isLoading, data };
};

export const useFile = () => {
   // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
   // This really helps to flesh out the quality of life for the API and is part
   // of creating something that is self documenting. We put Supplier because we know
   // that is what this endpoint will always return. 
    const { commonFetch, isLoading, data } = useFetch<Blob>({
       url: REACT_APP_API_URL + "/Files/file",
       method: "GET"
    });
  
    // using typescript to define the input here means no mistakes can be
    // made downstream when actually using our API layer
    const getFile = (query: GetFile) => commonFetch({ queryParams: query, fetchOptions: { responseType: 'blob' }});
  
    return { getFile, isLoading, data };
};