import useFetch from "../../hooks/useFetch";
import { AuthInput, UserDetails } from "./types";


const { REACT_APP_API_URL } = process.env;


export const useLogin = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
     const { commonFetch, isLoading, data } = useFetch<UserDetails>({
        url: REACT_APP_API_URL + "/Account/sign-in",
        method: "POST"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const authUser = (input: AuthInput) => commonFetch({ input , fetchOptions: {
      withCredentials: true
     }});
   
     return { authUser, isLoading, data };
};

export const useLogout = () => {
    // adding <Supplier> after useFetch will give the "data" value the type Supplier. 
    // This really helps to flesh out the quality of life for the API and is part
    // of creating something that is self documenting. We put Supplier because we know
    // that is what this endpoint will always return. 
     const { commonFetch, isLoading, data } = useFetch<void>({
        url: REACT_APP_API_URL + "/Account/sign-out",
        method: "DELETE"
     });
   
     // using typescript to define the input here means no mistakes can be
     // made downstream when actually using our API layer
     const logoutUser = () => commonFetch({ });
   
     return { logoutUser, isLoading, data };
};