import React from 'react';
import Calendar from '../components/Calendar';
import MatchTable from '../components/MatchTable';
import RankingTable from '../components/RankingTable';
import { useEvents } from '../context/EventContext';
import './PremierLeaguePage.css'; // 스타일 파일 추가

const PremierLeaguePage = () => {
  const { events } = useEvents();

  const handleDateClick = (date) => {
    if (!events[date]) {
      alert(`선택된 날짜: ${date}\n데이터가 없습니다.`);
      return;
    }
    alert(`선택된 날짜: ${date}\n일정: ${events[date]?.schedule || "없음"}\n결과: ${events[date]?.result || "없음"}`);
  };

  return (
    <div className="premier-league-page">
      <h1>프리미어리그 경기 일정</h1>
      {Object.keys(events).length > 0 ? (
        <>
          <Calendar events={events} onDateClick={handleDateClick} />
          <h2>경기 목록</h2>
          <MatchTable events={events} />
          <h2>순위표</h2>
          <RankingTable sport="premier-league" />
        </>
      ) : (
        <p>현재 표시할 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default PremierLeaguePage;