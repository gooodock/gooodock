package com.gooodock.model.dto;

import java.time.LocalDate;

public class NotificationDTO {
    private int notificationIdx;
    private int memberIdx;
    private int subscribeIdx;
    private String readYn;
    private LocalDate readDate;

    public int getNotificationIdx() {
        return notificationIdx;
    }

    public void setNotificationIdx(int notificationIdx) {
        this.notificationIdx = notificationIdx;
    }

    public int getMemberIdx() {
        return memberIdx;
    }

    public void setMemberIdx(int memberIdx) {
        this.memberIdx = memberIdx;
    }

    public int getSubscribeIdx() {
        return subscribeIdx;
    }

    public void setSubscribeIdx(int subscribeIdx) {
        this.subscribeIdx = subscribeIdx;
    }

    public String getReadYn() {
        return readYn;
    }

    public void setReadYn(String readYn) {
        this.readYn = readYn;
    }

    public LocalDate getReadDate() {
        return readDate;
    }

    public void setReadDate(LocalDate readDate) {
        this.readDate = readDate;
    }

    public NotificationDTO() {
    }

    public NotificationDTO(int notificationIdx, int memberIdx, int subscribeIdx, String readYn, LocalDate readDate) {
        this.notificationIdx = notificationIdx;
        this.memberIdx = memberIdx;
        this.subscribeIdx = subscribeIdx;
        this.readYn = readYn;
        this.readDate = readDate;
    }


}