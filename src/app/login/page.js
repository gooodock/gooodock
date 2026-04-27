'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [id, setId] = useState('1@a.com');
  const [pw, setPw] = useState(('1234!@asdf'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!id || !pw) {
      alert('아이디와 비밀번호를 입력해주세요!');
    return;
    }

    if(!emailRegex.test(id)){
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if(!pwRegex.test(pw)){
      alert('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
      return;
    }

    const userName = id.split('@')[0];
    localStorage.setItem('userName', userName);

    setIsLoggedIn(true);
  };

  //메인 페이지로
  const goToHome = () => {
    router.push('/');
  };

  //구독정보 페이지로
  const goToSubscription = () => {
    router.push(`/subscription?user=${id}`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {!isLoggedIn ? (
        // 로그인 전 화면
        <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>로그인</h2>
          <div>
            <input
              type="email"
              placeholder="example@mail.com"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '200px' }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '200px' }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              * 영문, 숫자, 특수문자 조합 8자 이상
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px'}}>
          <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px' }}>
            로그인
          </button>
          <button 
            type="button"
            onClick={goToHome}
            style={{width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px' }}>
            메인으로
          </button>
          </div>
        </form>
      ) : (
        // 로그인 후 화면
        <div>
          <h1>안녕하세요, {id.split('@')[0]}님!</h1>
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