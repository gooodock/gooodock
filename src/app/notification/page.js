'use client';

import { useEffect, useState } from "react";
import { notificationApi, notificationReadApi } from "../api/NotificationApi";

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
    padding: '20px',
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

  const readData = async (id, read) => {
    try {
      await notificationReadApi.setPost(id, !read);
      setNotifications(noti => 
        noti.map(item => 
          item.id === id ? { ...item, read: !read } : item
        )
      );
    }catch (error) {
      alert('상태 변경에 실패하였습니다.');
    } 
  }

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) return <div style={loadingStyle}>데이터를 불러오는 중입니다...</div>;
  
  if (isError) return <div style={errorStyle}>데이터를 가져오는데 실패했습니다.</div>;

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>알림 센터</h1>
      
        {notifications.length === 0 ? (<p>새로운 알림이 없습니다.</p>) : (
        notifications.map((item) => (
        <div key={item.id} style={loadingStyle}>
          <p>{item.text}</p>
          
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '12px', color: '#fafafa' }}>
              {String(new Date().toLocaleDateString())}
            </span>
            <button onClick={() => readData(item.id, item.read)}>
              {item.read ? '읽음' : '안 읽음'}
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
}