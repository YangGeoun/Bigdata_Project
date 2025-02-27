package com.bigdataproject.injectionprocess.user.controller;


import com.bigdataproject.injectionprocess.user.db.entity.User;
import com.bigdataproject.injectionprocess.user.dto.request.JoinReqDTO;
import com.bigdataproject.injectionprocess.user.dto.request.LoginReqDto;
import com.bigdataproject.injectionprocess.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @GetMapping("/test")
    public String user() {
        return "<h1>user<h1>";
    }

    @PostMapping("/join")
    public String join(@RequestBody JoinReqDTO joinReqDTO) {
        User user = userService.join(
                joinReqDTO.getUsername(),
                joinReqDTO.getPassword(),
                joinReqDTO.getName(),
                joinReqDTO.getEmail()
                );
        return user.toString();
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReqDto loginReqDto) {

//            String token = jwtTokenUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok("성공");

    }
}
