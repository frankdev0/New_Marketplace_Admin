import React, { createContext, useEffect, useState } from "react";
import { axios } from "./baseUrl";

export const AppContext = createContext();

const AppState = ({ children }) => {
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [metrics, setMetrics] = useState("");
  const [activitySummary, setActivitySummary] = useState("");

  useEffect(() => {
    axios
      .get("/dashboard/admin/activity-summary")
      .then((response) => {
        setActivitySummary(response.data.data);
        setUserLoading(false);
        console.log(response.data);
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
    metrics,
    setUser,
    setUserLoading,
    setMetrics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppState;
