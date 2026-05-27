'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('test@1234');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요!');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (!pwRegex.test(password)) {
      alert('비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }), 
        credentials: 'include',
      });

      if (response.ok) {
        alert('로그인에 성공했습니다!');
        
        const userName = email.split('@')[0];
        localStorage.setItem('userName', userName);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        alert('서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (error) {
      alert('서버와 연결할 수 없습니다. 톰캣 서버 구동 상태를 확인해 주세요.');
    }
  };

  const goToHome = () => {
    router.push('/');
  };

  const goToSubscription = () => {
    router.push('/subscription'); 
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '200px' }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password} // 💡 password 변수 매핑
              onChange={(e) => setPassword(e.target.value)}
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
            style={{width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px' }}>
            메인으로
          </button>
          </div>
        </form>
      ) : (
        // 로그인 후 화면
        <div>
          <h1>안녕하세요, {id.split('@')[0]}님!</h1>
          <p><span style={{color: '#7c3aed'}}>G</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#ec4899'}}>d</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>c</span>
  <span style={{color: '#fafafa'}}>k</span>에 접속됐습니다.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={goToSubscription} 
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              구독정보
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)} 
              style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}