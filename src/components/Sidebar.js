import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3>MyScore</h3>
      <ul>
        <li onClick={() => navigate('/korea-soccer')}>한국 축구</li>
        <li onClick={() => navigate('/premier-league')}>프리미어리그</li>
        <li onClick={() => navigate('/baseball')}>야구</li>
        <li onClick={() => navigate('/world-cup')}>월드컵</li>
        <li onClick={() => navigate('/custom-match')}>사설 경기 커스텀</li> {/* 새로운 링크 */}
      </ul>
    </div>
  );
};

export default Sidebar;