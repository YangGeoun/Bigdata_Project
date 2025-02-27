package com.bigdataproject.injectionprocess.user.service;

import com.bigdataproject.injectionprocess.user.db.entity.User;
import com.bigdataproject.injectionprocess.user.db.entity.UserRole;
import com.bigdataproject.injectionprocess.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    @Override
    public User login(String username, String password) {
        return null;
    }

    @Override
    public User join(String username, String password, String name, String email) {
        User user = User.builder()
                .username(username)
                .name(name)
                .role(UserRole.USER)
                .email(email)
                .build();
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return user;
    }
}
