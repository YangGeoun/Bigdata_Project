package com.bigdataproject.injectionprocess.user.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String name;

    @Column(length = 20)
    private String role;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String password;

    private LocalDateTime createDate;

    @Column(length = 255)
    private String provider;

    @Column(length = 255)
    private String providerId;

    @Column(length = 255)
    private String username;
}