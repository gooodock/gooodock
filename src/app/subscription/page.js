"use client";
import { useEffect, useState } from "react";
import { subscriptionApi } from "../api/SubscriptionApi";
import { useSubscriptionStore } from "./store/subscriptionStore";
import Header from "../components/Header";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(true);

  // 입력 폼 상태
  const [form, setForm] = useState({ type: "", price: "", date: "" });

  // zustand store에서 상태와 액션 가져오기
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const setSubscriptions = useSubscriptionStore(
    (state) => state.setSubscriptions,
  );
  const addSubscription = useSubscriptionStore(
    (state) => state.addSubscription,
  );
  const removeSubscription = useSubscriptionStore(
    (state) => state.removeSubscription,
  );
  const getTotalPrice = useSubscriptionStore((state) => state.getTotalPrice);

  // 서버에서 목록 불러오기
  const loadData = async () => {
    try {
      const data = await subscriptionApi.getAll();
      console.log("서버에서 온 실제 데이터:", data);
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("구독 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 입력 폼 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 추가 버튼 클릭
  const handleAdd = async () => {
    if (!form.type || !form.price || !form.date) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const nextId =
      subscriptions.length > 0
        ? Math.max(...subscriptions.map((s) => s.id)) + 1
        : 1;

    try {
      const created = await subscriptionApi.add({ id: nextId, ...form });
      addSubscription(created);
      setForm({ type: "", price: "", date: "" });
    } catch (error) {
      console.error("추가 실패:", error);
      alert("추가에 실패했습니다.");
    }
  };

  // 삭제 버튼 클릭
  const handleDelete = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await subscriptionApi.remove(id);
      removeSubscription(id);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading)
    return (
      <>
        <Header title="구독 관리" />
        <div style={{ padding: "20px" }}>로딩 중...</div>
      </>
    );

  const total = getTotalPrice();

  return (
    <>
      <Header title="구독 관리" />
      <div style={{ padding: "40px 20px", minHeight: "100vh" }}>
        {/* 입력 폼 */}
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 20px",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            name="type"
            placeholder="서비스명"
            value={form.type}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            placeholder="가격"
            value={form.price}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={inputStyle}
          />
          <button onClick={handleAdd} style={addButtonStyle}>
            추가
          </button>
        </div>

        {subscriptions.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", textAlign: "center" }}>
            구독 내역이 없습니다.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              borderCollapse: "collapse",
              textAlign: "center",
              backgroundColor: "var(--color-surface)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--color-primary)" }}>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>관리</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.type}</td>
                  <td style={tdStyle}>
                    {Number(item.price).toLocaleString()}원
                  </td>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={deleteButtonStyle}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
              <tr
                style={{
                  backgroundColor: "#27272a",
                  fontWeight: "bold",
                  color: "var(--color-accent)",
                }}
              >
                <td style={tdStyle}>총합</td>
                <td style={tdStyle}>{total.toLocaleString()}원</td>
                <td style={tdStyle}>-</td>
                <td style={tdStyle}>-</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

const thStyle = {
  border: "1px solid var(--color-border)",
  padding: "12px",
  fontWeight: "bold",
  color: "var(--color-text)",
};

const tdStyle = {
  border: "1px solid var(--color-border)",
  padding: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "8px 12px",
  border: "1px solid var(--color-border)",
  borderRadius: "6px",
  backgroundColor: "var(--color-surface)",
  color: "var(--color-text)",
  outline: "none",
};

const addButtonStyle = {
  padding: "8px 20px",
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text)",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const deleteButtonStyle = {
  padding: "6px 14px",
  backgroundColor: "var(--color-accent)",
  color: "var(--color-text)",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
