package com.gooodock.model.mapper;

import com.gooodock.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Param;

public interface MemberMapper {

    MemberDTO loginCheck(@Param("email") String email,
                         @Param("password") String password);
}
