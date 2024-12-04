import React from "react";
import Calendar from "../components/Calendar";
import MatchTable from "../components/MatchTable";
import RankingTable from "../components/RankingTable";
import { useEvents } from "../context/EventContext";
import "./UserPage.css"; // 스타일 파일 추가

const KoreaSoccerPage = () => {
  const { events } = useEvents();

  return (
    <div className="user-page">
      <h1>한국 축구 경기 일정</h1>
      <div className="calendar-container">
        <Calendar events={events} sport="korea-soccer" />
      </div>
      <h2>경기 목록</h2>
      <div className="match-table-container">
        <MatchTable events={events} sport="korea-soccer" />
      </div>
      <h2>순위표</h2>
      <RankingTable sport="korea-soccer" />
    </div>
  );
};

export default KoreaSoccerPage;