import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const loginData = localStorage.getItem("isLogin");
  const userInfoData = localStorage.getItem("userInfo");

  const [login, setLogin] = useState(loginData === "true");
  const [userInfo, setUserInfo] = useState(
    userInfoData ? JSON.parse(userInfoData) : null
  );

  return (
    <AuthContext.Provider value={{ login, setLogin, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
