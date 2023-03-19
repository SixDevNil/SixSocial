import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
// import Sary from "../Dummy/sary.jpg";
// import cover from "../Dummy/viking.jpg";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };

  // const [removeCookie] = useCookies("accessToken");
  const logout = async () => {
    try {
      //  await axios.get("http://localhost:8800/api/auth/logout")
      //  setIsLoggedOut(true)
      setCurrentUser(null);
      Cookies.removeCookie('accesToken')
      // setCookie('accessToken')
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if(cookies){
  //     removeCookie(cookies);
  //   }
  // })
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
