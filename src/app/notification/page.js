'use client';
import { useEffect, useState } from "react";
import { notificationApi } from "../api/NotificationApi";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await notificationApi.getPost();
      console.log("서버에서 온 실제 데이터:", data);
      setNotifications(Array.isArray(data) ? data : data.notification || []);
    } catch (error) {
      console.error("알림 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="p-5">로딩 중...</div>;

  return (
    <div>
      <h1 style={{ padding: '20px', textAlign: 'center' }}>
        알림 센터
      </h1>
      
      {notifications.length === 0 ? (
        <p style={{ color: '#888' }}>새로운 알림이 없습니다.</p>
      ) : (
        notifications.map((item) => (
          <div key={item.id} >
            {!item.read}
            <p>{item.text}</p>
            <span>{item.date}</span>
          </div>
        ))
      )}
    </div>
  );
}