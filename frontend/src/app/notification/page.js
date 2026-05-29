'use client';

import { useEffect, useState } from "react";
import { notificationApi, notificationReadApi } from "../api/NotificationApi";
import Header from "../components/Header";

const divStyle = {
    backgroundColor: '#09090b',
    color: '#fafafa',
    padding: '20px',
    textAlign: 'center'
};
const h1Style = {
    backgroundColor: '#7c3aed',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '15px', 
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
    color: '#fafafa'
};
const errorStyle = {
    backgroundColor: '#7c3aed',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '15px', 
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
    color: 'red'
};
const loadingStyle = {
    backgroundColor: '#18181b',
    borderRadius: '5px',
    padding: '20px',
    marginBottom: '15px', 
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
    color: '#fafafa'
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadData = async () => {
    try {
      const data = await notificationApi.getPost();
      setNotifications(Array.isArray(data) ? data : data.notification || []);

      await new Promise((resolve) => {setTimeout(resolve, 1000)});

    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

    const readData = async (id, isReadBoolean) => {
        try {
            const nextReadBoolean = !isReadBoolean;
            const sendReadYn = nextReadBoolean ? 'Y' : 'N';

            await notificationReadApi.setPost(id, sendReadYn);

            setNotifications(noti =>
                noti.map(item =>
                    item.id === id ? { ...item, read: nextReadBoolean } : item
                )
            );
        } catch (error) {
            alert('상태 변경에 실패하였습니다.');
        }
    }

  useEffect(() => {
    loadData();
  }, []);

  const formatPrice = (price) => {
    return price ? price.toLocaleString() : '0';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  if (isLoading) return <div style={loadingStyle}>데이터를 불러오는 중입니다...</div>;
  
  if (isError) return <div style={errorStyle}>데이터를 가져오는데 실패했습니다.</div>;

  return (
    
    <div style={divStyle}>
      <Header title="구독 관리" showNotification={false}/>
      <h1 style={h1Style}>알림 센터</h1>
      
        {notifications.length === 0 ? (<p>새로운 알림이 없습니다.</p>) : (
        notifications.map((item) => {
    const customText = `[${item.platformName}] 구독 서비스의 결제 예정일이 다가옵니다. 이번 달 결제 금액은 ${formatPrice(item.platformPrice)}원입니다.`;

    return (
        <div key={item.notificationIdx} style={loadingStyle}>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{customText}</p>
            <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                  결제 예정일: {formatDate(item.updateSubDate)}
                </span>
                <div style={{ marginTop: '10px' }}>
                    <button
                        onClick={() => readData(item.id, item.read)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            backgroundColor: item.read ? '#4b5563' : '#7c3aed',
                            color: '#fff',
                            border: 'none'
                        }}
                    >
                        {item.read ? '읽음' : '안 읽음'}
                    </button>
                </div>
            </div>
      </div>
    ); 
  })
)}
  </div>
);
}