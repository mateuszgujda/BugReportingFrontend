import axios from "axios";
import { ReactNode, createContext, useContext, useMemo, useReducer } from "react";
import { AuthUser, JWT } from "../api/auth/types";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

interface AuthProviderProps{
  children? : ReactNode,

}

enum AuthActionKind {
  SET_TOKEN = 'setToken',
  CLEAR_TOKEN = 'clearToken'
}

interface AuthState {
  token: string | null
  userDetails: AuthUser | null
}

interface AuthContext {
  token: string | null,
  userDetails: AuthUser | null,
  setAuthValue? : (token : string) => void,
  clearAuthValue? : () => void
}

interface AuthAction {
  token: string | null,
  userDetails: AuthUser | null,
  cookiesSetter : (name : string, value: any, options? : CookieSetOptions | undefined) => void
}

// Create the authentication context
const AuthContext = createContext<AuthContext>({token: null, userDetails: null, setAuthValue: () => {}, clearAuthValue: () =>{} });

// Define the possible actions for the authReducer
// Reducer function to handle authentication state changes
const authReducer = (state: AuthState, action: { type: AuthActionKind; payload: AuthAction; }) => {
  switch (action.type) {
    case "setToken":
      // Set the authentication token in axios headers and local storage
      axios.defaults.headers.common["Authorization"] = "Bearer " + action.payload;
      // Update the state with the new token
      return { ...state, token: action.payload.token, userDetails: action.payload.userDetails };

    case "clearToken":
      // Clear the authentication token from axios headers and local storage
      delete axios.defaults.headers.common["Authorization"];
      action.payload.cookiesSetter("__access-token", null);

      // Update the state by removing the token
      return { ...state, authContext: null };

    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );

      return { ...state, authContext: null}
  }
};

const decodeJWTAsUserDetails = (token : string | null) : AuthUser | null => {
  if(token)
  {
    const JWTDecoded = jwtDecode<JWT>(token);
    console.log(JWTDecoded);
    return {
      userId : JWTDecoded.userId,
      email : JWTDecoded.email,
      role : JWTDecoded.role,
      permissions : []
    }
  }
  return null;
}

// Initial state for the authentication context


// AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children } : AuthProviderProps) => {
  // Use reducer to manage the authentication state

  const [cookies, setCookies] = useCookies();
  
  const initialData : AuthContext = {
    token: cookies["__access-token"],
    userDetails: decodeJWTAsUserDetails(cookies["__access-token"])
  };
  const [state, dispatch] = useReducer(authReducer, initialData);

  // Function to set the authentication token
  const setAuthValue = (token : string) => {
    let newContext : AuthContext = {
      token: token,
      userDetails: decodeJWTAsUserDetails(token)
    }

    // Dispatch the setToken action to update the state
    dispatch({ type: AuthActionKind.SET_TOKEN, payload: {...newContext, cookiesSetter: setCookies }});
  };

  // Function to clear the authentication token
  const clearAuthValue = () => {
    // Dispatch the clearToken action to update the state
    dispatch({ type: AuthActionKind.CLEAR_TOKEN, payload: {
      token: null,
      userDetails: null,
      cookiesSetter: setCookies
    } });
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setAuthValue,
      clearAuthValue,
    }),
    [state]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;