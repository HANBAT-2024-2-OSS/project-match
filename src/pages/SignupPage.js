import React, { useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase";
import "./SignupPage.css"; // 스타일 적용

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = async () => {
    const actionCodeSettings = {
      url: "https://match-3a560.firebaseapp.com/complete-signup", // 리디렉션 URL (Firebase 콘솔에 등록 필요)
      handleCodeInApp: true,
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
      },
      dynamicLinkDomain: "example.page.link",
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("인증 링크가 이메일로 전송되었습니다. 이메일을 확인하세요.");
    } catch (error) {
      setMessage(`에러 발생: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signup-input"
      />
      <button onClick={handleSendLink} className="signup-button">이메일 링크 보내기</button>
      {message && <p className="signup-message">{message}</p>}
    </div>
  );
};

export default SignupPage;