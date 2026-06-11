package com.gooodock;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.gooodock.model.mapper")
public class GooodockApplication {

    public static void main(String[] args) {
        SpringApplication.run(GooodockApplication.class, args);
    }
}