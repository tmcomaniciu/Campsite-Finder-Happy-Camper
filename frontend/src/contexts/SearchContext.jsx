import React, { useContext, useState } from "react";

// Create Context
const SearchContext = React.createContext(undefined);

// Context Provider Component
export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState(sessionStorage.getItem("destination") || "");
  const [checkIn, setCheckIn] = useState(new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState(new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
  const [adultCount, setAdultCount] = useState(parseInt(sessionStorage.getItem("adultCount") || "1"));
  const [childCount, setChildCount] = useState(parseInt(sessionStorage.getItem("childCount") || "0"));
  const [campsiteId, setCampsiteId] = useState(sessionStorage.getItem("campsiteId") || "");

  const saveSearchValues = (destination, checkIn, checkOut, adultCount, childCount, campsiteId) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (campsiteId) {
      setCampsiteId(campsiteId); 
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (campsiteId) {
      sessionStorage.setItem("campsiteId", campsiteId);
    }
  };

  return (
    <SearchContext.Provider value={{ destination, checkIn, checkOut, adultCount, childCount, campsiteId, saveSearchValues }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchContextProvider");
  }
  return context;
};