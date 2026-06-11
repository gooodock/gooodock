package com.gooodock.controller;

import com.gooodock.model.dao.NotificationDAO;
import com.gooodock.model.dto.MemberDTO;
import com.gooodock.model.dto.NotificationDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationDAO notificationDAO;

    public NotificationController(NotificationDAO notificationDAO) {
        this.notificationDAO = notificationDAO;
    }

    @GetMapping("/notification")
    public ResponseEntity<List<NotificationDTO>> getNotifications(HttpSession session) {

        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<NotificationDTO> result = notificationDAO.selectNotification(loginUser.getMemberIdx());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/notification")
    public ResponseEntity<Map<String, Object>> updateNotification(
            @RequestBody NotificationDTO requestBody) {

        int result = notificationDAO.updateNotification(requestBody);

        if (result > 0) {
            return ResponseEntity.ok(Map.of("success", true));
        }

        return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "변경 실패"
        ));
    }
}