import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // 축소/확장 상태
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // 상태 토글
  };

  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? ">" : "<"}
      </button>
      <h3>관리자 메뉴</h3>
      <ul>
        <li onClick={() => navigate("/admin-schedule")}>
          <i className="fas fa-calendar"></i>
          <span>전체 경기 일정 입력</span>
        </li>
        <li onClick={() => navigate("/admin-korea-soccer")}>
          <i className="fas fa-futbol"></i>
          <span>한국 축구 일정 입력</span>
        </li>
        <li onClick={() => navigate("/admin-premier-league")}>
          <i className="fas fa-trophy"></i>
          <span>프리미어리그 일정 입력</span>
        </li>
        <li onClick={() => navigate("/admin-emails")}>
          <i className="fas fa-envelope"></i>
          <span>회원 이메일 확인</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;