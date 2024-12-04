import React from 'react';
import Calendar from '../components/Calendar';
import MatchTable from '../components/MatchTable';
import { useEvents } from '../context/EventContext';
import './KoreaSoccerPage.css'; // 스타일 파일 추가

const KoreaSoccerPage = () => {
  const { events } = useEvents();

  const handleDateClick = (date) => {
    if (!events[date]) {
      alert(`선택된 날짜: ${date}\n데이터가 없습니다.`);
      return;
    }
    alert(`선택된 날짜: ${date}\n일정: ${events[date]?.schedule || "없음"}\n결과: ${events[date]?.result || "없음"}`);
  };

  return (
    <div className="korea-soccer-page">
      <h1>한국 축구 경기 일정</h1>
      {Object.keys(events).length > 0 ? (
        <>
          <Calendar events={events} onDateClick={handleDateClick} />
          <h2>경기 목록</h2>
          <MatchTable events={events} />
        </>
      ) : (
        <p>현재 표시할 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default KoreaSoccerPage;