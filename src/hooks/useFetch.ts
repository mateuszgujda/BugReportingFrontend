
import { useState } from "react";

const DEFAULT_FETCH_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

type UseFetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE"
};

type CommonFetch = {
  /** the variables that the endpoint expects to receive */
  input?: { [index: string]: any };
  queryParams?: { [index: string]: any };
  /** this allows you to override any default fetch options on a 
  case by case basis. think of it like an escape hatch. */
  fetchOptions?: RequestInit;
}

// <T> turns this into a generic component. We will take advantage of this 
// by assigning the `data` variable the type T. If this doesn't make sense, 
// it will when we get to the next file. 
function useCustomFetch<T> ({ url, method }: UseFetchProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // we are assigning the generic type T to our data value here
  const [data, setData] = useState<T | null>(null as any);

  const commonFetch = async ({
    input,
    queryParams,
    fetchOptions = {},
  }: CommonFetch) => {
    setIsLoading(true);

    let finalUrl = url;
    if(queryParams)
    {
      let params = new URLSearchParams(queryParams);
      let keysForDel = Array<string>();
      params.forEach((value, key) => {
        if (value == '' || value == 'undefined') {
          keysForDel.push(key);
        }
      });
      
      keysForDel.forEach(key => {
        params.delete(key);
      });

      finalUrl = url + "?" + params.toString();
    }


    try{
      const response = await fetch(finalUrl, {
        method,
        ...DEFAULT_FETCH_OPTIONS, // this should be defined as a const in a separate file
        ...fetchOptions, // this allows you to override any default fetch options on a case by case basis
        body: JSON.stringify(input),
        
      });

      const data = await response.json();
      setIsLoading(false);
      setData(data);
    }
    catch(e){
      console.log(e);
      setIsLoading(false);
      setData(null);
    }




  };

  return { isLoading, commonFetch, data };
};

export default useCustomFetch;