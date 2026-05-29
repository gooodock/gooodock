package com.gooodock.model.dao;

import com.common.JDBCTemplate;
import com.gooodock.model.dto.NotificationDTO;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NotificationDAO {
    public List<NotificationDTO> selectNotification(int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rset = null;
        List<NotificationDTO> list = new ArrayList<>();
        NotificationDTO dto = new NotificationDTO();

       String query = "SELECT tn.notification_idx, ts.subscribe_idx, ts.platform_name, ts.platform_price, ts.update_sub_date, tn.read_yn " +
                "FROM tbl_subscription ts " +
                "INNER JOIN tbl_notification tn ON ts.subscribe_idx = tn.subscribe_idx " +
                "WHERE ts.member_idx = ?";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, memberIdx);

            rset = pstmt.executeQuery();

            while (rset.next()) {
                dto = new NotificationDTO();
                dto.setNotificationIdx(rset.getInt("notification_idx"));
                dto.setPlatformName(rset.getString("platform_name"));
                dto.setPlatformPrice(rset.getInt("platform_price"));
                dto.setUpdateSubDate(rset.getDate("update_sub_date").toLocalDate());
                dto.setReadYn(rset.getString("read_yn"));

                list.add(dto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(rset);
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return list;
    }

    public int updateNotification(NotificationDTO notificationDTO) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;

        String dateQuery = "N".equals(notificationDTO.getReadYn()) ? "NULL" : "NOW()";
        String query = "UPDATE tbl_notification SET read_yn = ?, read_date = " + dateQuery + " WHERE notification_idx = ?";
        int result = 0;

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, notificationDTO.getReadYn());
            pstmt.setInt(2, notificationDTO.getNotificationIdx());

            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return result;
    }

    public int insertNotification(int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        String query = "INSERT INTO tbl_notification (member_idx, subscribe_idx, read_yn, read_date) " +
                "SELECT ts.member_idx, ts.subscribe_idx, 'N', NULL " +
                "FROM tbl_subscription ts " +
                "WHERE ts.member_idx = ? " +
                "  AND CURDATE() BETWEEN DATE_SUB(ts.update_sub_date, INTERVAL 10 DAY) AND ts.update_sub_date " +
                "  AND NOT EXISTS ( " +
                "      SELECT 1 FROM tbl_notification tn " +
                "      WHERE tn.member_idx = ts.member_idx " +
                "        AND tn.subscribe_idx = ts.subscribe_idx " +
                "  )";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, memberIdx);
            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }
        return result;
    }

    public int deleteNotification(int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        String query = "DELETE FROM tbl_notification " +
                "WHERE member_idx = ? " +
                "  AND subscribe_idx IN ( " +
                "      SELECT subscribe_idx FROM tbl_subscription WHERE update_sub_date < CURDATE() " +
                "  )";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, memberIdx);
            result = pstmt.executeUpdate();

            if (result > 0) {
                try {
                    if (conn != null && !conn.getAutoCommit()) {
                        conn.commit();
                    }
                } catch (SQLException se) {
                    se.printStackTrace();
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }
        return result;
    }
}
