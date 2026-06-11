package com.common;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MyBatisTemplate {

    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("MyBatis SqlSessionFactory 초기화 실패", e);
        }
    }

    /**
     * 자동 커밋 OFF (INSERT / UPDATE / DELETE 시 사용)
     */
    public static SqlSession getSession() {
        return sqlSessionFactory.openSession(false);
    }

    /**
     * 자동 커밋 ON (SELECT 시 사용)
     */
    public static SqlSession getAutoCommitSession() {
        return sqlSessionFactory.openSession(true);
    }

    public static void close(SqlSession session) {
        if (session != null) {
            session.close();
        }
    }

    public static void commit(SqlSession session) {
        if (session != null) {
            session.commit();
        }
    }

    public static void rollback(SqlSession session) {
        if (session != null) {
            session.rollback();
        }
    }
}