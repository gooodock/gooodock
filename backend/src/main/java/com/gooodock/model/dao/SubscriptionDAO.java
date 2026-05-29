package com.gooodock.model.dao;

import com.common.JDBCTemplate;
import com.gooodock.model.dto.SubscriptionDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class SubscriptionDAO {
    // 사용자의 구독 리스트 확인
    public List<SubscriptionDTO> findByMemberIdx(int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rset = null;
        List<SubscriptionDTO> list = new ArrayList<>();

        String query = "SELECT * FROM tbl_subscription WHERE member_idx = ? AND delete_yn = 'N'";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, memberIdx);

            rset = pstmt.executeQuery();

            while (rset.next()) {
                SubscriptionDTO dto = new SubscriptionDTO(
                        rset.getInt("subscribe_idx"),
                        rset.getString("platform_name"),
                        rset.getInt("platform_price"),
                        rset.getString("delete_yn"),
                        rset.getDate("regist_sub_date").toLocalDate(),
                        rset.getDate("update_sub_date").toLocalDate(),
                        rset.getInt("member_idx")
                );
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

    // 구독 정보 삭제 (논리삭제: delete_yn = 'Y'로 변경)
    public int deleteSubscription(int subscribeIdx, int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        // 본인 소유 구독만 삭제되도록 member_idx 조건 추가 (보안)
        String query = "UPDATE tbl_subscription SET delete_yn = 'Y' " +
                "WHERE subscribe_idx = ? AND member_idx = ?";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, subscribeIdx);
            pstmt.setInt(2, memberIdx);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return result; // 영향받은 행 수 (1이면 성공, 0이면 대상 없음)
    }

    // 갱신 날짜 수정
    public int updateSubDate(int subscribeIdx, int memberIdx, LocalDate newDate) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        String query = "UPDATE tbl_subscription SET update_sub_date = ? " +
                "WHERE subscribe_idx = ? AND member_idx = ? AND delete_yn = 'N'";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setDate(1, java.sql.Date.valueOf(newDate));
            pstmt.setInt(2, subscribeIdx);
            pstmt.setInt(3, memberIdx);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return result;
    }

    // 구독 추가 (최초구독일·갱신구독일 둘 다 입력 날짜로 설정)
    public int insertSubscription(String platformName, int platformPrice,
                                  LocalDate subDate, int memberIdx) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        String query = "INSERT INTO tbl_subscription " +
                "(platform_name, platform_price, delete_yn, regist_sub_date, update_sub_date, member_idx) " +
                "VALUES (?, ?, 'N', ?, ?, ?)";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, platformName);
            pstmt.setInt(2, platformPrice);
            pstmt.setDate(3, java.sql.Date.valueOf(subDate));
            pstmt.setDate(4, java.sql.Date.valueOf(subDate));
            pstmt.setInt(5, memberIdx);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return result;
    }
}