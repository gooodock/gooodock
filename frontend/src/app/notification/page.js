'use client';

import { useEffect, useState } from "react";
import { notificationApi, notificationReadApi } from "../api/NotificationApi";
import Header from "../components/Header";

const divStyle = { backgroundColor: '#09090b', color: '#fafafa', padding: '20px', textAlign: 'center' };
const h1Style = { backgroundColor: '#7c3aed', borderRadius: '5px', padding: '20px', marginBottom: '15px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: '#fafafa' };
const errorStyle = { backgroundColor: '#7c3aed', borderRadius: '5px', padding: '20px', marginBottom: '15px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: 'red' };
const loadingStyle = { backgroundColor: '#18181b', borderRadius: '5px', padding: '20px', marginBottom: '15px', border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', color: '#fafafa' };

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const loadData = async () => {
        try {
            const data = await notificationApi.getPost();

            const list = Array.isArray(data) ? data : data.notification || [];
            setNotifications(list);

            await new Promise((resolve) => {setTimeout(resolve, 1000)});
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const readData = async (notificationIdx, currentReadBoolean) => {
        if (!notificationIdx) {
            console.error("⚠️ 에러: notificationIdx 값이 유실되었습니다.");
            return;
        }

        try {
            const nextReadYn = currentReadBoolean ? 'N' : 'Y';

            const nextReadBoolean = !currentReadBoolean;

            await notificationReadApi.setPost(notificationIdx, nextReadYn);

            setNotifications(prev =>
                prev.map(item =>
                    item.notificationIdx === notificationIdx ? { ...item, read: nextReadBoolean } : item
                )
            );
        } catch (error) {
            console.error("상태 변경 통신 에러:", error);
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

    const centerHasUnread = notifications.some((item) => item.read === false);

    return (
        <div style={divStyle}>
            <Header title="구독 관리" showNotification={false} hasUnread={centerHasUnread} />
            <h1 style={h1Style}>알림 센터</h1>

            {notifications.length === 0 ? (<p>새로운 알림이 없습니다.</p>) : (
                notifications.map((item, index) => {
                    const currentIdx = item.notificationIdx;

                    const isRead = item.read === true;

                    const customText = `[${item.platformName || '구독 서비스'}] 결제 예정일이 다가옵니다. 이번 달 결제 금액은 ${formatPrice(item.platformPrice)}원입니다.`;

                    return (
                        <div key={currentIdx || `index-key-${index}`} style={loadingStyle}>
                            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{customText}</p>
                            <div style={{ marginTop: '20px' }}>
                                <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                                  결제 예정일: {formatDate(item.updateSubDate)}
                                </span>
                                <div style={{ marginTop: '10px' }}>
                                    <button
                                        onClick={() => readData(currentIdx, isRead)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            // 읽었으면 회색(#4b5563), 안 읽었으면 보라색(#7c3aed)
                                            backgroundColor: isRead ? '#4b5563' : '#7c3aed',
                                            color: '#fff',
                                            border: 'none'
                                        }}
                                    >
                                        {isRead ? '읽음' : '안 읽음'}
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