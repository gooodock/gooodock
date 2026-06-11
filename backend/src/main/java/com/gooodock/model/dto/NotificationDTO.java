package com.gooodock.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class NotificationDTO {

    private int notificationIdx;
    private int memberIdx;
    private int subscribeIdx;
    private String readYn;
    private LocalDate readDate;
    private String platformName;
    private int platformPrice;
    private LocalDate updateSubDate;

    @JsonProperty("read")
    public boolean isRead() {
        return "Y".equals(this.readYn);
    }

    public int getNotificationIdx() { return notificationIdx; }
    public void setNotificationIdx(int notificationIdx) { this.notificationIdx = notificationIdx; }

    public int getMemberIdx() { return memberIdx; }
    public void setMemberIdx(int memberIdx) { this.memberIdx = memberIdx; }

    public int getSubscribeIdx() { return subscribeIdx; }
    public void setSubscribeIdx(int subscribeIdx) { this.subscribeIdx = subscribeIdx; }

    public String getReadYn() { return readYn; }
    public void setReadYn(String readYn) { this.readYn = readYn; }

    public LocalDate getReadDate() { return readDate; }
    public void setReadDate(LocalDate readDate) { this.readDate = readDate; }

    public String getPlatformName() { return platformName; }
    public void setPlatformName(String platformName) { this.platformName = platformName; }

    public int getPlatformPrice() { return platformPrice; }
    public void setPlatformPrice(int platformPrice) { this.platformPrice = platformPrice; }

    public LocalDate getUpdateSubDate() { return updateSubDate; }
    public void setUpdateSubDate(LocalDate updateSubDate) { this.updateSubDate = updateSubDate; }

    public NotificationDTO() {}

    public NotificationDTO(int notificationIdx, int memberIdx, String readYn, LocalDate readDate,
                           int subscribeIdx, String platformName, int platformPrice, LocalDate updateSubDate) {
        this.notificationIdx = notificationIdx;
        this.memberIdx = memberIdx;
        this.readYn = readYn;
        this.readDate = readDate;
        this.subscribeIdx = subscribeIdx;
        this.platformName = platformName;
        this.platformPrice = platformPrice;
        this.updateSubDate = updateSubDate;
    }
}