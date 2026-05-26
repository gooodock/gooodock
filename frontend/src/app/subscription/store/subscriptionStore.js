import { create } from "zustand";

export const useSubscriptionStore = create((set, get) => ({
  subscriptions: [],

  // 구독 목록 한꺼번에 세팅 (서버에서 받아온 데이터로 초기화할 때 사용)
  setSubscriptions: (list) => set({ subscriptions: list }),

  // 항목 추가 (서버가 id를 만들어준 항목을 그대로 push)
  addSubscription: (item) =>
    set((state) => ({
      subscriptions: [...state.subscriptions, item],
    })),

  // 항목 삭제 (id 기준)
  removeSubscription: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.filter((item) => item.id !== id),
    })),

  // 총합 계산 (price가 문자열로 들어오니까 Number로 변환)
  getTotalPrice: () => {
    const { subscriptions } = get();
    return subscriptions.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0
    );
  },
}));
