package com.gooodock.model.dto;

import java.time.LocalDate;

public class SubscriptionDTO {
    private int subscribeIdx;
    private String platformName;
    private int platformPrice;
    private String deleteYn;
    private LocalDate registSubDate;
    private LocalDate updateSubDate;
    private int memberIdx;

    public SubscriptionDTO() {
    }

    public SubscriptionDTO(int subscribeIdx, String platformName, int platformPrice, String deleteYn, LocalDate registSubDate, LocalDate updateSubDate, int memberIdx) {
        this.subscribeIdx = subscribeIdx;
        this.platformName = platformName;
        this.platformPrice = platformPrice;
        this.deleteYn = deleteYn;
        this.registSubDate = registSubDate;
        this.updateSubDate = updateSubDate;
        this.memberIdx = memberIdx;
    }

    public int getSubscribeIdx() {
        return subscribeIdx;
    }

    public void setSubscribeIdx(int subscribeIdx) {
        this.subscribeIdx = subscribeIdx;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public int getPlatformPrice() {
        return platformPrice;
    }

    public void setPlatformPrice(int platformPrice) {
        this.platformPrice = platformPrice;
    }

    public String getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(String deleteYn) {
        this.deleteYn = deleteYn;
    }

    public LocalDate getRegistSubDate() {
        return registSubDate;
    }

    public void setRegistSubDate(LocalDate registSubDate) {
        this.registSubDate = registSubDate;
    }

    public LocalDate getUpdateSubDate() {
        return updateSubDate;
    }

    public void setUpdateSubDate(LocalDate updateSubDate) {
        this.updateSubDate = updateSubDate;
    }

    public int getMemberIdx() {
        return memberIdx;
    }

    public void setMemberIdx(int memberIdx) {
        this.memberIdx = memberIdx;
    }
}