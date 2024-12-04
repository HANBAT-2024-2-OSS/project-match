import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Sidebar from './components/Sidebar';
import AdminSidebar from './components/AdminSidebar';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import UserInfoPage from './pages/UserInfoPage'; // 사용자 정보 페이지 추가
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보

  const auth = getAuth();

  // Firebase 사용자 상태 추적
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setIsAdmin(user.email === "admin@example.com"); // 관리자 확인 (예제)
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("로그아웃 에러:", error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <div className="layout">
          <Sidebar />
          {isLoggedIn && isAdmin && <AdminSidebar />}
          <main className="content" style={{ marginLeft: isAdmin ? '440px' : '220px' }}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
              <Route path="/user-info" element={<UserInfoPage user={currentUser} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;