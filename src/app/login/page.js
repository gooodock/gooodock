'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    if (id && pw) {
      setIsLoggedIn(true);
    } else {
      alert('아이디와 비밀번호를 입력해주세요!');
    }
  };
  //구독 정보 페이지로
  const goToSubscription = () => {
    router.push(`/subscription?user=${id}`);
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
          <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#7c3aed', border: 'none', borderRadius: '4px' }}>
            로그인
          </button>
        </form>
      ) : (
        // 로그인 후 화면
        <div>
          <h1>안녕하세요, name님!</h1>
          <p>Gooodock에 접속됐습니다.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={goToSubscription} 
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              구독정보
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)} 
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}