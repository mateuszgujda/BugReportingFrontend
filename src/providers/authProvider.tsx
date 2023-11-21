import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { UserDetails } from "../api/auth/types";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps{
  children? : ReactNode,

}

enum AuthActionKind {
  SET_TOKEN = 'setToken',
  CLEAR_TOKEN = 'clearToken'
}

interface AuthContext {
  token: string | null
}

interface AuthAction {
  token: string | null
}

// Create the authentication context
const AuthContext = createContext<AuthContext>({token: null});

// Define the possible actions for the authReducer
// Reducer function to handle authentication state changes
const authReducer = (state: any, action: { type: AuthActionKind; payload: AuthAction; }) => {
  switch (action.type) {
    case "setToken":
      // Set the authentication token in axios headers and local storage
      axios.defaults.headers.common["Authorization"] = "Bearer " + action.payload;
      localStorage.setItem("token", action.payload.token as string);
      // Update the state with the new token
      return { ...state, authContext: action.payload };

    case "clearToken":
      // Clear the authentication token from axios headers and local storage
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      // Update the state by removing the token
      return { ...state, authContext: null };

    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );
  }
};

// Initial state for the authentication context
const initialData : AuthContext = {
  token: localStorage.getItem("token"),
};

// AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children } : AuthProviderProps) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData);

  // Function to set the authentication token
  const setAuthValue = (newContext : AuthContext) => {
    // Dispatch the setToken action to update the state
    dispatch({ type: AuthActionKind.SET_TOKEN, payload: newContext });
  };

  // Function to clear the authentication token
  const clearAuthValue = () => {
    // Dispatch the clearToken action to update the state
    dispatch({ type: AuthActionKind.CLEAR_TOKEN, payload: {
      token: null
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