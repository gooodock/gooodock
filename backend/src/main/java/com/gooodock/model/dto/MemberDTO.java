package com.gooodock.model.dto;

public class MemberDTO {
    private int memberIdx;
    private String email;
    private String password;
    private String name;

    public MemberDTO() {
    }

    public MemberDTO(int memberIdx, String email, String password, String name) {
        this.memberIdx = memberIdx;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public int getMemberIdx() {
        return memberIdx;
    }

    public void setMemberIdx(int memberIdx) {
        this.memberIdx = memberIdx;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
