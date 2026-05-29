const API = "http://localhost:8080/api/subscriptions";

// 백엔드(DTO) → 프론트 형태로 변환
const toClient = (dto) => ({
  id: dto.subscribeIdx,
  type: dto.platformName,
  price: dto.platformPrice,
  date: dto.updateSubDate, // 화면 표시는 갱신일 기준
});

export const subscriptionApi = {
  // 전체 조회
  getAll: async () => {
    const res = await fetch(API, {
      method: "GET",
      credentials: "include", // 세션 쿠키(JSESSIONID) 전송
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`조회 실패: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(toClient) : [];
  },

  // 추가 (item: { type, price, date })
  add: async (item) => {
    const res = await fetch(API, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        platformName: item.type,
        platformPrice: Number(item.price),
        registSubDate: item.date,
      }),
    });
    if (!res.ok) throw new Error(`추가 실패: ${res.status}`);
    return res.json();
  },

  // 날짜 수정 (갱신 날짜)
  updateDate: async (id, newDate) => {
    const res = await fetch(API, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscribeIdx: id,
        updateSubDate: newDate,
      }),
    });
    if (!res.ok) throw new Error(`수정 실패: ${res.status}`);
    return res.json();
  },

  // 삭제 (id로 특정 항목 삭제)
  remove: async (id) => {
    const res = await fetch(API, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribeIdx: id }),
    });
    if (!res.ok) throw new Error(`삭제 실패: ${res.status}`);
    return res.json();
  },
};
