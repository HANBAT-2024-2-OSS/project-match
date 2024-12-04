import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ events, onDateClick, isAdmin }) => {
  const [currentMonth, setCurrentMonth] = useState(0); // 0: January, 11: December
  const [newEvent, setNewEvent] = useState({ date: "", schedule: "", result: "" });

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleAddEvent = () => {
    onDateClick(newEvent.date, { schedule: newEvent.schedule, result: newEvent.result });
    setNewEvent({ date: "", schedule: "", result: "" });
  };

  const renderDays = () => {
    const year = 2024;
    const days = [];
    const daysCount = daysInMonth(currentMonth, year);

    for (let day = 1; day <= daysCount; day++) {
      const dateKey = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = events[dateKey];

      days.push(
        <div key={day} className="calendar-day" onClick={() => onDateClick(dateKey)}>
          <div className="date">{day}</div>
          {event && (
            <>
              <div className="event">{event.schedule}</div>
              <div className="result">{event.result}</div>
            </>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>이전</button>
        <h2>{2024}년 {currentMonth + 1}월</h2>
        <button onClick={handleNextMonth}>다음</button>
      </div>

      <div className="calendar-grid">{renderDays()}</div>

      {isAdmin && (
        <div className="add-event">
          <h3>새 일정 추가</h3>
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
      )}
    </div>
  );
};

export default Calendar;