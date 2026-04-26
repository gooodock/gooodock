'use client'; // 클라이언트 컴포넌트 설정

import { useState } from 'react';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (id && pw) {
      setIsLoggedIn(true); // 아이디와 비번이 입력되었다면 로그인 성공 처리
    } else {
      alert('아이디와 비밀번호를 입력해주세요!');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {!isLoggedIn ? (
        // 로그인 전 화면
        <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
          <h2>로그인</h2>
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
            로그인하기
          </button>
        </form>
      ) : (
        // 로그인 후 화면
        <div>
          <h1>안녕하세요, {id}님!</h1>
          <br/>
          <p>성공적으로 접속하셨습니다. 😊</p>
          <button onClick={() => setIsLoggedIn(false)} style={{ marginTop: '20px' }}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}