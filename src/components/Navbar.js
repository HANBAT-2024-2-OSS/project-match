import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={() => navigate('/')}>MyScore</h1>
      <div className="navbar-buttons">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')}>로그인</button>
            <button onClick={() => navigate('/signup')}>회원가입</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/user-info')}>내 정보</button>
            <button onClick={onLogout}>로그아웃</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;