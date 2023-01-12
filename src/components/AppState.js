import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "./baseUrl";

export const AppContext = createContext();

const AppState = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [activitySummary, setActivitySummary] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/dashboard/admin/activity-summary")
      .then((response) => {
        setActivitySummary(response.data.data);
        setUserLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUserLoading(false);
      });
  }, []);

  const value = {
    user,
    userLoading,
    activitySummary,
    setUser,
    setUserLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppState;
