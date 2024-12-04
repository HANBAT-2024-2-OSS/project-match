import React, { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({}); // 일정 및 결과 데이터
  const [rankings, setRankings] = useState({
    "korea-soccer": [],
    "premier-league": [],
  }); // 순위 데이터

  const addEvent = (date, event) => {
    setEvents((prev) => ({ ...prev, [date]: event }));
  };

  const updateRankings = (sport, newRankings) => {
    setRankings((prev) => ({ ...prev, [sport]: newRankings }));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, rankings, updateRankings }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);