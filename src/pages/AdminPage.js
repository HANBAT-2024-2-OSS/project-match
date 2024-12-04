import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';

const AdminPage = () => {
  const { addEvent } = useEvents(); // 전역 상태에 데이터 추가
  const [newEvent, setNewEvent] = useState({ date: '', schedule: '', result: '' });

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.schedule) {
      addEvent(newEvent.date, {
        schedule: newEvent.schedule,
        result: newEvent.result,
      });
      setNewEvent({ date: '', schedule: '', result: '' });
    }
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      <div className="add-event">
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="경기 제목"
          value={newEvent.schedule}
          onChange={(e) => setNewEvent({ ...newEvent, schedule: e.target.value })}
        />
        <input
          type="text"
          placeholder="결과"
          value={newEvent.result}
          onChange={(e) => setNewEvent({ ...newEvent, result: e.target.value })}
        />
        <button onClick={handleAddEvent}>추가</button>
      </div>
    </div>
  );
};

export default AdminPage;