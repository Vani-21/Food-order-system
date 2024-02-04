import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const RoutePaths = {
  Login: "/login",
  HomePage: "/",
};

const intialUserValue = {
  id: 0,
  name: "",
  email: "",
  password: "",
  roleId: 0,
  role: "",
};

const initialState = {
  setUser: () => {},
  user: intialUserValue,
  signOut: () => {},
  appInitialize: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [appInitialize, setAppInitialize] = useState(false);
  const [user, _setUser] = useState(intialUserValue);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const setUser = (user) => {
    console.log("vani@gmail.com", user);
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user);
  };

  useEffect(() => {
    const itemStr =
      JSON.parse(localStorage.getItem("user")) ||
      intialUserValue;
    if (!itemStr.id) {
      navigate(RoutePaths.Login);
    }
    _setUser(itemStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    setUser(intialUserValue);
    localStorage.removeItem("user");
    navigate(RoutePaths.Login);
  };

  useEffect(() => {
    if (pathname === RoutePaths.Login && user.id) {
      navigate(RoutePaths.HomePage);
    }

    if (!user.id) {
      return;
    }
    const access = true;
    if (!access) {
      toast.warning("Sorry, you are not authorized to access this page");
      navigate(RoutePaths.HomePage);
      return;
    }
    setAppInitialize(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  let value = {
    user,
    setUser,
    signOut,
    appInitialize,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};


// // AuthContext.js
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     // Perform login logic, set user data in state
//     setUser(userData);
//   };

//   const logout = () => {
//     // Perform logout logic, clear user data from state
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);
