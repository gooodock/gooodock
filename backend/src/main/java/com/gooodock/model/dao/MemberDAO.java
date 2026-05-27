package com.gooodock.model.dao;

import com.common.JDBCTemplate;
import com.gooodock.model.dto.MemberDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MemberDAO {
    public MemberDTO loginCheck(String email, String password) {
        Connection conn = JDBCTemplate.getConnection();
        PreparedStatement pstmt = null;
        ResultSet rset = null;

        String query = "SELECT * FROM tbl_member WHERE email = ? AND password = ?";

        try {
            pstmt = conn.prepareStatement(query);
            pstmt.setString(1, email);
            pstmt.setString(2, password);

            rset = pstmt.executeQuery();

            if (rset.next()) {
                return new MemberDTO(rset.getInt("member_idx"), rset.getString("email"),
                        rset.getString("password"), rset.getString("name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCTemplate.close(rset);
            JDBCTemplate.close(pstmt);
            JDBCTemplate.close(conn);
        }

        return new MemberDTO();
    }
}
