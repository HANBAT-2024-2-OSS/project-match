import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ events = {}, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(0);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const renderDays = () => {
    const year = 2024;
    const days = [];
    const daysCount = daysInMonth(currentMonth, year);

    for (let day = 1; day <= daysCount; day++) {
      const dateKey = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = events[dateKey];

      days.push(
        <div key={day} className="calendar-day">
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
    </div>
  );
};

export default Calendar;