package com.gooodock.service;

import com.gooodock.model.dao.SubscriptionDAO;
import com.gooodock.model.dto.SubscriptionDTO;

import java.time.LocalDate;
import java.util.List;

public class SubscriptionService {

    private final SubscriptionDAO subscriptionDAO = new SubscriptionDAO();

    // 구독 목록 조회
    public List<SubscriptionDTO> getSubscriptions(int memberIdx) {
        return subscriptionDAO.findByMemberIdx(memberIdx);
    }

    // 구독 삭제 — 성공하면 true
    public boolean removeSubscription(int subscribeIdx, int memberIdx) {
        int result = subscriptionDAO.deleteSubscription(subscribeIdx, memberIdx);
        return result > 0;
    }

    // 갱신 날짜 수정 — 성공하면 true
    public boolean changeSubDate(int subscribeIdx, int memberIdx, LocalDate newDate) {
        // 검증: 미래 날짜만 허용한다든지 하는 비즈니스 규칙을 여기 둠
        if (newDate == null) {
            return false;
        }
        int result = subscriptionDAO.updateSubDate(subscribeIdx, memberIdx, newDate);
        return result > 0;
    }

    // 구독 추가 — 성공하면 true
    public boolean addSubscription(String platformName, int platformPrice,
                                   LocalDate subDate, int memberIdx) {
        if (platformName == null || platformName.isBlank()
                || platformPrice < 0 || subDate == null) {
            return false;
        }
        int result = subscriptionDAO.insertSubscription(
                platformName, platformPrice, subDate, memberIdx);
        return result > 0;
    }
}