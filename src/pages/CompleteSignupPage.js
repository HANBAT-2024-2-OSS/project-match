import React, { useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase";
import "./CompleteSignupPage.css"; // 스타일 적용

const CompleteSignupPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCompleteSignup = async () => {
    const emailForSignIn = window.localStorage.getItem("emailForSignIn") || email;

    if (!emailForSignIn) {
      setMessage("이메일을 입력해야 합니다.");
      return;
    }

    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setMessage("유효하지 않은 링크입니다.");
      return;
    }

    try {
      const result = await signInWithEmailLink(auth, emailForSignIn, window.location.href);
      setMessage("회원가입이 완료되었습니다!");
      console.log("사용자 정보:", result.user);

      // 로컬 스토리지에서 이메일 제거
      window.localStorage.removeItem("emailForSignIn");
    } catch (error) {
      // 구체적인 에러 메시지 처리
      setMessage(`회원가입 에러: ${error.message}`);
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <div className="complete-signup-container">
      <h2 className="complete-signup-title">이메일 인증 완료</h2>
      {!window.localStorage.getItem("emailForSignIn") && (
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="complete-signup-input"
        />
      )}
      <button onClick={handleCompleteSignup} className="complete-signup-button">
        회원가입 완료
      </button>
      {message && <p className="complete-signup-message">{message}</p>}
    </div>
  );
};

export default CompleteSignupPage;
