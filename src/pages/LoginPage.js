import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 네비게이션 사용

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      // 로그인 정보를 상위 컴포넌트로 전달
      onLogin(username, password);

      // 로그인 성공 시 메인 페이지로 이동
      navigate("/");
    } else {
      // 에러 메시지 출력
      setError("아이디와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">로그인</button>
      </form>
      {error && <p className="error">{error}</p>} {/* 에러 메시지 */}
      <p className="login-help">
        비밀번호를 잊으셨나요?{" "}
        <a href="/password-reset" className="login-reset-link">비밀번호 재설정</a>
      </p>
    </div>
  );
};

export default LoginPage;