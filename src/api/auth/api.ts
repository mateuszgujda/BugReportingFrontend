import { useLogin, useLogout } from "./requests";

export const useAuthApi = () => {
    const {
      authUser,
      isLoading: authUserLoading,
      data: getUserData,
    } = useLogin();
  
    const {
      logoutUser,
      isLoading: logoutUserLoading,
      data: logoutData
    } = useLogout();
  
    return {
        authUser: {
        query: authUser,
        isLoading: authUserLoading,
        data: getUserData,
      },
      browseReports: {
        query: logoutUser,
        isLoading: logoutUserLoading,
        data: logoutData,
      },
    };
  };