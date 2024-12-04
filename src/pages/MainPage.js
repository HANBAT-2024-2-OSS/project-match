import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import MatchTable from '../components/MatchTable';
import { useEvents } from '../context/EventContext';
import './MainPage.css';

const MainPage = () => {
  const { events } = useEvents();
  const [showAlert, setShowAlert] = useState(true);

  const handleDateClick = (date) => {
    alert(`선택된 날짜: ${date}\n일정: ${events[date]?.schedule || "없음"}\n결과: ${events[date]?.result || "없음"}`);
  };

  return (
    <div className="main-page">
      {/* 알림 박스 */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>위 사이트는 공부용으로 만들어졌으며 보안이 안전하지 않을 수 있습니다. 회원가입을 자제해 주세요.</p>
            <button className="close-alert-btn" onClick={() => setShowAlert(false)}>닫기</button>
          </div>
        </div>
      )}

      <h1>전체 경기 일정</h1>
      <Calendar events={events} onDateClick={handleDateClick} />
      <h2>어제, 오늘, 내일 경기</h2>
      <MatchTable events={events} />
    </div>
  );
};

export default MainPage;