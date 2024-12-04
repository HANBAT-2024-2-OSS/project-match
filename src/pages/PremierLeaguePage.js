import React from "react";
import Calendar from "../components/Calendar";
import MatchTable from "../components/MatchTable";
import RankingTable from "../components/RankingTable";
import { useEvents } from "../context/EventContext";
import "./UserPage.css"; // 동일한 스타일 파일 사용

const PremierLeaguePage = () => {
  const { events } = useEvents();

  return (
    <div className="user-page">
      <h1>프리미어리그 경기 일정</h1>
      <div className="calendar-container">
        <Calendar events={events} sport="premier-league" />
      </div>
      <h2>경기 목록</h2>
      <div className="match-table-container">
        <MatchTable events={events} sport="premier-league" />
      </div>
      <h2>순위표</h2>
      <RankingTable sport="premier-league" />
    </div>
  );
};

export default PremierLeaguePage;