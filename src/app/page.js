import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Gooodock</h1>
      <nav style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link href="/login"><button>Gooodock 로그인</button></Link>
      </nav>
    </div>
  );
}