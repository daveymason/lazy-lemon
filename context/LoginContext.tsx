import { createContext, useContext, useState } from 'react';

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userInfo: {
    name: string;
  } | null;
}

export const LoginContext = createContext<LoginContextType>({
  userInfo: null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},

});

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<LoginContextType['userInfo']>(null);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};