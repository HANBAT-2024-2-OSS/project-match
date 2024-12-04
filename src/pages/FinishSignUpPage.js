import React, { useEffect, useState } from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const FinishSignUpPage = () => {
  const [message, setMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        setMessage("이메일이 필요합니다. 다시 시도해주세요.");
      } else {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            setMessage("회원가입이 완료되었습니다.");
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            setMessage(`에러 발생: ${error.message}`);
          });
      }
    }
  }, [auth]);

  return (
    <div>
      <h2>회원가입 완료</h2>
      <p>{message}</p>
    </div>
  );
};

export default FinishSignUpPage;