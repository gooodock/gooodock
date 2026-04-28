import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>
  <span style={{color: '#7c3aed'}}>G</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#ec4899'}}>d</span>
  <span style={{color: '#fafafa'}}>o</span>
  <span style={{color: '#fafafa'}}>c</span>
  <span style={{color: '#fafafa'}}>k</span>
</h1>
      <nav style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link href="/login"><button style={{width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#7c3aed', border: 'none', borderRadius: '4px'}}>로그인 하기</button></Link>
      </nav>
    </div>
  );
}