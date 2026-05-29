package com.gooodock.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gooodock.model.dto.MemberDTO;
import com.gooodock.model.dto.SubscriptionDTO;
import com.gooodock.service.SubscriptionService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;

@WebServlet("/api/subscriptions")
public class SubscriptionController extends HttpServlet {

    private static final SubscriptionService subscriptionService = new SubscriptionService();
    private static final ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // ── 구독 추가 ──
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        setCors(resp);
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();

        MemberDTO loginUser = getLoginUser(req);
        if (loginUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\": false, \"message\": \"로그인이 필요합니다.\"}");
            return;
        }

        String body = readBody(req);
        String platformName = extractValue(body, "platformName");
        int platformPrice = extractInt(body, "platformPrice");
        String dateStr = extractValue(body, "registSubDate"); // "2026-05-28" 형식

        if (platformName.isEmpty() || dateStr.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\": false, \"message\": \"필수 값이 누락되었습니다.\"}");
            return;
        }

        LocalDate subDate;
        try {
            subDate = LocalDate.parse(dateStr);
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\": false, \"message\": \"날짜 형식이 올바르지 않습니다.\"}");
            return;
        }

        boolean ok = subscriptionService.addSubscription(
                platformName, platformPrice, subDate, loginUser.getMemberIdx());

        if (ok) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
            out.print("{\"success\": true, \"message\": \"구독이 추가되었습니다.\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"success\": false, \"message\": \"추가에 실패했습니다.\"}");
        }
    }

    // ── 구독 목록 조회 ──
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        setCors(resp);
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();

        MemberDTO loginUser = getLoginUser(req);
        if (loginUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\": false, \"message\": \"로그인이 필요합니다.\"}");
            return;
        }

        List<SubscriptionDTO> subList =
                subscriptionService.getSubscriptions(loginUser.getMemberIdx());

        out.print(mapper.writeValueAsString(subList));
    }

    // ── 갱신 날짜 수정 ──
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        setCors(resp);
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();

        MemberDTO loginUser = getLoginUser(req);
        if (loginUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\": false, \"message\": \"로그인이 필요합니다.\"}");
            return;
        }

        String body = readBody(req);
        int subscribeIdx = extractInt(body, "subscribeIdx");
        String dateStr = extractValue(body, "updateSubDate"); // "2026-05-28" 형식

        if (subscribeIdx == 0 || dateStr.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\": false, \"message\": \"필수 값이 누락되었습니다.\"}");
            return;
        }

        LocalDate newDate;
        try {
            newDate = LocalDate.parse(dateStr); // ISO-8601 (yyyy-MM-dd)
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\": false, \"message\": \"날짜 형식이 올바르지 않습니다.\"}");
            return;
        }

        boolean ok = subscriptionService.changeSubDate(
                subscribeIdx, loginUser.getMemberIdx(), newDate);

        if (ok) {
            out.print("{\"success\": true, \"message\": \"갱신 날짜가 수정되었습니다.\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"success\": false, \"message\": \"수정 대상을 찾을 수 없습니다.\"}");
        }
    }

    // ── 구독 삭제 ──
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        setCors(resp);
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();

        MemberDTO loginUser = getLoginUser(req);
        if (loginUser == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print("{\"success\": false, \"message\": \"로그인이 필요합니다.\"}");
            return;
        }

        String body = readBody(req);
        int subscribeIdx = extractInt(body, "subscribeIdx");

        if (subscribeIdx == 0) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"success\": false, \"message\": \"subscribeIdx가 누락되었습니다.\"}");
            return;
        }

        boolean ok = subscriptionService.removeSubscription(
                subscribeIdx, loginUser.getMemberIdx());

        if (ok) {
            out.print("{\"success\": true, \"message\": \"구독이 삭제되었습니다.\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"success\": false, \"message\": \"삭제 대상을 찾을 수 없습니다.\"}");
        }
    }

    // ── CORS 프리플라이트 ──
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        setCors(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    // ── 공통 헬퍼 ──
    private void setCors(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
    }

    private MemberDTO getLoginUser(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        return (session != null) ? (MemberDTO) session.getAttribute("loginUser") : null;
    }

    private String readBody(HttpServletRequest req) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        BufferedReader reader = req.getReader();
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }

    private String extractValue(String json, String key) {
        try {
            String pattern = "\"" + key + "\":\"";
            int start = json.indexOf(pattern) + pattern.length();
            int end = json.indexOf("\"", start);
            return json.substring(start, end);
        } catch (Exception e) {
            return "";
        }
    }

    private int extractInt(String json, String key) {
        try {
            String pattern = "\"" + key + "\":";
            int start = json.indexOf(pattern) + pattern.length();
            // 숫자 끝(콤마 또는 }) 찾기
            int end = start;
            while (end < json.length() && (Character.isDigit(json.charAt(end)) || json.charAt(end) == '-')) {
                end++;
            }
            return Integer.parseInt(json.substring(start, end).trim());
        } catch (Exception e) {
            return 0;
        }
    }
}