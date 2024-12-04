// src/pages/PasswordResetPage.js
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/Common.css";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("비밀번호 재설정 이메일이 발송되었습니다.");
    } catch (err) {
      setMessage(`에러 발생: ${err.message}`);
    }
  };

  return (
    <div className="page-container">
      <h2>비밀번호 재설정</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>재설정 이메일 보내기</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetPage;
