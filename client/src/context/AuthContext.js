import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../utilities/Loading";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPending(false);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentUser(response.data);
        setPending(false);
      })
      .catch((error) => {
        console.error(error);
        setPending(false);
      });
  }, []);

  if (pending) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
