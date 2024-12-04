import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AdminSidebar from './components/AdminSidebar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserInfoPage from './pages/UserInfoPage';
import AdminPage from './pages/AdminPage';
import AdminEmailsPage from './pages/AdminEmailsPage';
import KoreaSoccerPage from './pages/KoreaSoccerPage';
import PremierLeaguePage from './pages/PremierLeaguePage';
import AdminKoreaSoccerPage from './pages/AdminKoreaSoccerPage';
import AdminPremierLeaguePage from './pages/AdminPremierLeaguePage';
import { EventProvider } from './context/EventContext';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (username, password) => {
    setCurrentUser({ username });

    if (username === 'admin' && password === 'Admin!2345') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  return (
    <EventProvider>
      <Router>
        <div className="App">
          <Navbar
            isLoggedIn={!!currentUser}
            isAdmin={isAdmin}
            onLogout={handleLogout}
          />
          <div className="layout">
            <Sidebar /> {/* 기본 사이드바 */}
            {isAdmin && (
              <AdminSidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            )}
            <main
              className="content"
              style={{
                marginTop: '60px', // Navbar 높이만큼 여백 추가
                marginLeft: isAdmin
                  ? isSidebarOpen
                    ? '440px' // Sidebar(220px) + AdminSidebar(220px)
                    : '220px' // Sidebar만 열려 있는 경우
                  : '220px', // 일반 사용자 (Sidebar만 표시)
                transition: 'margin-left 0.3s ease', // 부드러운 이동 애니메이션
              }}
            >
              <Routes>
                {/* 메인 및 사용자 관련 페이지 */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/user-info" element={<UserInfoPage user={currentUser} />} />

                {/* 관리자 페이지 */}
                <Route path="/admin-schedule" element={<AdminPage />} />
                <Route path="/admin-emails" element={<AdminEmailsPage />} />
                <Route path="/admin-korea-soccer" element={<AdminKoreaSoccerPage />} />
                <Route path="/admin-premier-league" element={<AdminPremierLeaguePage />} />

                {/* 종목별 사용자 페이지 */}
                <Route path="/korea-soccer" element={<KoreaSoccerPage />} />
                <Route path="/premier-league" element={<PremierLeaguePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;