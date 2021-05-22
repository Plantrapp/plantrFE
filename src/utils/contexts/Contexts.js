import { createContext, useContext } from "react";

export const FormValuesContext = createContext();

export const UserContext = createContext();

export const CurrentUserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};
export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
