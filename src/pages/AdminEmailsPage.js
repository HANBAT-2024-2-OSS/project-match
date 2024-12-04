// src/pages/AdminEmailsPage.js
import React, { useState, useEffect } from 'react';
import './AdminEmailsPage.css';

const AdminEmailsPage = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // 여기에 이메일 데이터를 가져오는 로직 추가 (예: Firebase)
    const mockEmails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
    setEmails(mockEmails);
  }, []);

  return (
    <div className="admin-emails-page">
      <h2>회원 이메일 확인</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEmailsPage;