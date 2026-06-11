package com.gooodock.model.dao;

import com.gooodock.model.dto.MemberDTO;
import com.gooodock.model.mapper.MemberMapper;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {

    private final MemberMapper memberMapper;

    public MemberDAO(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public MemberDTO loginCheck(String email, String password) {
        MemberDTO result = memberMapper.loginCheck(email, password);
        return result != null ? result : new MemberDTO();
    }
}