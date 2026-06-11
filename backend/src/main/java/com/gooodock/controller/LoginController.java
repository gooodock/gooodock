package com.gooodock.controller;

import com.gooodock.model.dao.MemberDAO;
import com.gooodock.model.dao.NotificationDAO;
import com.gooodock.model.dto.MemberDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final MemberDAO memberDAO;
    private final NotificationDAO notificationDAO;

    public LoginController(MemberDAO memberDAO, NotificationDAO notificationDAO) {
        this.memberDAO = memberDAO;
        this.notificationDAO = notificationDAO;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody Map<String, String> body,
            HttpSession session) {

        String email    = body.get("email");
        String password = body.get("password");

        MemberDTO loginMember = memberDAO.loginCheck(email, password);

        if (loginMember != null && loginMember.getMemberIdx() != 0) {
            session.setAttribute("loginUser", loginMember);
            session.setMaxInactiveInterval(30 * 60);

            int memberIdx = loginMember.getMemberIdx();
            notificationDAO.deleteNotification(memberIdx);
            notificationDAO.insertNotification(memberIdx);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "name", loginMember.getName()
            ));
        }

        return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "로그인 실패"
        ));
    }
}