// src/pages/UserInfoPage.js
import React from "react";

const UserInfoPage = ({ user }) => {
  if (!user) return <p className="page-container">로그인이 필요합니다.</p>;

  return (
    <div className="page-container">
      <h2>내 정보</h2>
      <p><strong>아이디:</strong> {user.username}</p>
    </div>
  );
};

export default UserInfoPage;