import React, { useState } from "react";
import { useEvents } from "../context/EventContext";
import './AdminKoreaSoccerPage.css';

const AdminKoreaSoccerPage = () => {
  const { events, addEvent } = useEvents();
  const [scheduleForm, setScheduleForm] = useState({ date: "", schedule: "" });
  const [resultForm, setResultForm] = useState({ date: "", result: "" });

  // 일정 입력 핸들러
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!scheduleForm.date || !scheduleForm.schedule) {
      alert("날짜와 일정을 입력하세요.");
      return;
    }
    addEvent(scheduleForm.date, {
      ...events[scheduleForm.date],
      schedule: scheduleForm.schedule,
    });
    alert("일정이 추가되었습니다.");
    setScheduleForm({ date: "", schedule: "" });
  };

  // 결과 입력 핸들러
  const handleResultChange = (e) => {
    const { name, value } = e.target;
    setResultForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResultSubmit = (e) => {
    e.preventDefault();
    if (!resultForm.date || !resultForm.result) {
      alert("날짜와 결과를 입력하세요.");
      return;
    }
    addEvent(resultForm.date, {
      ...events[resultForm.date],
      result: resultForm.result,
    });
    alert("결과가 추가되었습니다.");
    setResultForm({ date: "", result: "" });
  };

  return (
    <div>
      <h1>한국 축구 일정 입력</h1>

      {/* 일정 입력 폼 */}
      <form onSubmit={handleScheduleSubmit}>
        <h2>일정 입력</h2>
        <label>
          날짜:
          <input
            type="date"
            name="date"
            value={scheduleForm.date}
            onChange={handleScheduleChange}
          />
        </label>
        <label>
          일정:
          <input
            type="text"
            name="schedule"
            value={scheduleForm.schedule}
            onChange={handleScheduleChange}
            placeholder="예: 팀 A vs 팀 B"
          />
        </label>
        <button type="submit">일정 추가</button>
      </form>

      {/* 결과 입력 폼 */}
      <form onSubmit={handleResultSubmit}>
        <h2>결과 입력</h2>
        <label>
          날짜:
          <input
            type="date"
            name="date"
            value={resultForm.date}
            onChange={handleResultChange}
          />
        </label>
        <label>
          결과:
          <input
            type="text"
            name="result"
            value={resultForm.result}
            onChange={handleResultChange}
            placeholder="예: 2:1"
          />
        </label>
        <button type="submit">결과 추가</button>
      </form>

      {/* 현재 데이터 표시 */}
      <div>
        <h2>현재 데이터</h2>
        <ul>
          {Object.entries(events).map(([date, data]) => (
            <li key={date}>
              <strong>{date}</strong>: {data.schedule || "일정 없음"} /{" "}
              {data.result || "결과 없음"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminKoreaSoccerPage;
