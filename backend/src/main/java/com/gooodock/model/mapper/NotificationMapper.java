package com.gooodock.model.mapper;

import com.gooodock.model.dto.NotificationDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface NotificationMapper {

    List<NotificationDTO> selectNotification(@Param("memberIdx") int memberIdx);

    int updateNotification(NotificationDTO notificationDTO);

    int insertNotification(@Param("memberIdx") int memberIdx);

    int deleteNotification(@Param("memberIdx") int memberIdx);
}
