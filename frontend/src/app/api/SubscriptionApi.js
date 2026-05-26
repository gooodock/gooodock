const API = "http://localhost:4000/subscriptions";

export const subscriptionApi = {
  // 전체 조회
  getAll: async () => {
    const res = await fetch(API, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },

  // 추가 (item: { type, price, date })
  add: async (item) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    return res.json();
  },

  // 삭제 (id로 특정 항목 삭제)
  remove: async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
};
