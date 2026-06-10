package com.gooodock.controller;

import com.gooodock.model.dao.NotificationDAO;
import com.gooodock.model.dto.MemberDTO;
import com.gooodock.model.dto.NotificationDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/api/notification")
public class NotificationController extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private static final NotificationDAO notificationDAO = new NotificationDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);
        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();

        int memberIdx = 0;
        HttpSession session = request.getSession(false);

        if (session != null && session.getAttribute("loginUser") != null) {
            MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
            memberIdx = loginUser.getMemberIdx();
        }

        List<NotificationDTO> result = notificationDAO.selectNotification(memberIdx);

        StringBuilder json = new StringBuilder();
        json.append("[");

        if (result != null && !result.isEmpty()) {
            for (int i = 0; i < result.size(); i++) {
                NotificationDTO item = result.get(i);

                json.append("{")
                        .append("\"notificationIdx\":").append(item.getNotificationIdx()).append(",")
                        .append("\"platformName\":\"").append(item.getPlatformName()).append("\",")
                        .append("\"platformPrice\":").append(item.getPlatformPrice()).append(",")
                        .append("\"updateSubDate\":\"").append(item.getUpdateSubDate()).append("\",")
                        .append("\"read\":").append("Y".equals(item.getReadYn()) ? "true" : "false")
                        .append("}");

                if (i < result.size() - 1) {
                    json.append(",");
                }
            }
        }

        json.append("]");
        out.print(json.toString());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(response);
        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            BufferedReader reader = request.getReader();
            StringBuilder jsonBuffer = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuffer.append(line);
            }
            String requestBody = jsonBuffer.toString();

            int notificationIdx = Integer.parseInt(extractValue(requestBody, "notificationIdx"));
            String isRead = extractValue(requestBody, "readYn");

            NotificationDTO updateNoti = new NotificationDTO();
            updateNoti.setNotificationIdx(notificationIdx);
            updateNoti.setReadYn(isRead);

            int result = notificationDAO.updateNotification(updateNoti);

            if (result > 0) {
                out.print("{\"success\": true}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"success\": false, \"message\": \"변경 실패\"}");
            }
            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    private String extractValue(String json, String key) {
        if (json == null || !json.contains(key)) {
            return null;
        }
        try {
            int keyIndex = json.indexOf("\"" + key + "\"");
            if (keyIndex == -1) return null;

            int colonIndex = json.indexOf(":", keyIndex);
            if (colonIndex == -1) return null;

            int endIndex = json.indexOf(",", colonIndex);
            if (endIndex == -1) {
                endIndex = json.indexOf("}", colonIndex);
            }

            String value = json.substring(colonIndex + 1, endIndex).trim();

            value = value.replaceAll("[\"']", "").trim();

            return value;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}