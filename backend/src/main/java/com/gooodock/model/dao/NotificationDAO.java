package com.gooodock.model.dao;

import com.gooodock.model.dto.NotificationDTO;
import com.gooodock.model.mapper.NotificationMapper;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class NotificationDAO {

    private final NotificationMapper notificationMapper;

    public NotificationDAO(NotificationMapper notificationMapper) {
        this.notificationMapper = notificationMapper;
    }

    public List<NotificationDTO> selectNotification(int memberIdx) {
        List<NotificationDTO> list = notificationMapper.selectNotification(memberIdx);
        return list != null ? list : Collections.emptyList();
    }

    public int updateNotification(NotificationDTO notificationDTO) {
        return notificationMapper.updateNotification(notificationDTO);
    }

    public int insertNotification(int memberIdx) {
        return notificationMapper.insertNotification(memberIdx);
    }

    public int deleteNotification(int memberIdx) {
        return notificationMapper.deleteNotification(memberIdx);
    }
}