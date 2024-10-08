import { createContext, useState, ReactNode } from "react";
import { role } from "../ROLE";

interface AuthContextType {
  auth: {
    profileMode: string;
  };
  handleProfileMode: (mode: string) => void;
}
const defaultAuthContext: AuthContextType = {
  auth: { profileMode: role.guest },
  handleProfileMode: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const ContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const profileMode: string = localStorage.getItem("profileMode") || role.guest;

  const [auth, setAuth] = useState({ profileMode: profileMode });

  const handleProfileMode = (mode: string) => {
    if (mode) {
      localStorage.setItem("profileMode", mode);
      setAuth({ ...auth, profileMode: mode });
    }
  };

  return (
    <AuthContext.Provider value={{ auth, handleProfileMode }}>
      {children}
    </AuthContext.Provider>
  );
};
