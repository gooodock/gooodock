"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notificationApi } from "../api/NotificationApi";

export default function Header({ title, showNotification = true }) {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);

  // TODO: 실제 로그인 연동 시 user store나 세션에서 가져오기
  const userName = "User";

  // 안읽은 알림 있는지 체크
  useEffect(() => {
    const checkUnread = async () => {
      try {
        const data = await notificationApi.getPost();
        const list = Array.isArray(data) ? data : data.notification || [];
        setHasUnread(list.some((item) => !item.read));
      } catch (error) {
        console.error("알림 확인 실패:", error);
      }
    };
    checkUnread();
  }, []);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      // TODO: 실제 로그아웃 로직 (토큰 제거 등)
      router.push("/login");
    }
  };

  const handleNotificationClick = () => {
    router.push("/notification");
  };

  const handleSubscriptionClick = () => {
    router.push("/subscription");
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
       
        <div style={rightSectionStyle}>
          {/* 종 아이콘 (알림 페이지로 이동) */}
          {showNotification && (
            <button
              onClick={handleNotificationClick}
              style={iconButtonStyle}
              aria-label="알림"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {/* 안읽은 알림 있으면 빨간 점 표시 */}
              {hasUnread && <span style={badgeStyle} />}
            </button>
          )}
          {!showNotification && (
            <button
              onClick={handleSubscriptionClick}
              style={iconButtonStyle}
              aria-label="구독 정보"
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>구독 정보</span>
            </button>
          )}
          {/* 유저 이름 */}
          <span style={userNameStyle}>{userName}님</span>

          {/* 로그아웃 버튼 */}
          <button onClick={handleLogout} style={logoutButtonStyle}>
            로그아웃
          </button>
        
        </div>
      
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 32px",
  borderBottom: "1px solid var(--color-border)",
  backgroundColor: "var(--color-surface)",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "var(--color-text)",
  margin: 0,
};

const rightSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const iconButtonStyle = {
  position: "relative",
  background: "transparent",
  border: "none",
  color: "var(--color-text)",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const badgeStyle = {
  position: "absolute",
  top: "2px",
  right: "2px",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "var(--color-accent)",
};

const userNameStyle = {
  color: "var(--color-text)",
  fontSize: "14px",
};

const logoutButtonStyle = {
  padding: "6px 14px",
  backgroundColor: "transparent",
  color: "var(--color-text)",
  border: "1px solid var(--color-border)",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};
