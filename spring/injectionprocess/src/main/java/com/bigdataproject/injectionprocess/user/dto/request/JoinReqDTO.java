package com.bigdataproject.injectionprocess.user.dto.request;

import lombok.Data;

@Data
public class JoinReqDTO {
    String name;
    String username;
    String password;
    String email;
}
