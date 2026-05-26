package com.common;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JDBCTemplate {

    public static Connection getConnection() {
        Properties prop = new Properties();

        try (InputStream input = JDBCTemplate.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                throw new IllegalStateException("db.properties 파일을 찾을 수 없습니다.");
            }

            prop.load(input);

            String driver = prop.getProperty("driver");
            String url = prop.getProperty("url");

            Class.forName(driver);

            return DriverManager.getConnection(url, prop);
        } catch (IOException | ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void close(Connection con) {
        try {
            if (con != null && !con.isClosed()) {
                con.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void close(Statement stmt) {
        try {
            if (stmt != null && !stmt.isClosed()) {
                stmt.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void close(ResultSet rset) {
        try {
            if (rset != null && !rset.isClosed()) {
                rset.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}