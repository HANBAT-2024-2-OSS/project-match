import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({});
  const [rankings, setRankings] = useState({
    "korea-soccer": [],
    "premier-league": [],
  });

  const calculateRankings = useCallback((sport) => {
    const sportEvents = Object.values(events).filter(
      (event) => event.sport === sport && event.result
    );

    const scores = {};

    sportEvents.forEach((event) => {
      const [teamA, teamB] = event.schedule.split(" vs ");
      const [scoreA, scoreB] = event.result.split(":").map(Number);

      if (!scores[teamA]) scores[teamA] = 0;
      if (!scores[teamB]) scores[teamB] = 0;

      if (scoreA > scoreB) {
        scores[teamA] += 3;
      } else if (scoreA < scoreB) {
        scores[teamB] += 3;
      } else {
        scores[teamA] += 1;
        scores[teamB] += 1;
      }
    });

    const sortedRankings = Object.entries(scores)
      .sort(([, pointsA], [, pointsB]) => pointsB - pointsA)
      .map(([team, points]) => ({ team, points }));

    setRankings((prev) => ({ ...prev, [sport]: sortedRankings }));
  }, [events]);

  useEffect(() => {
    calculateRankings("korea-soccer");
    calculateRankings("premier-league");
  }, [calculateRankings]);

  const addEvent = (date, event) => {
    setEvents((prev) => ({ ...prev, [date]: event }));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, rankings }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);