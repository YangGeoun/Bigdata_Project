package com.bigdataproject.injectionprocess.user.service;

import com.bigdataproject.injectionprocess.user.db.entity.User;

public interface UserService {
    public User login(String username, String password);

    public User join(String username, String password, String name, String email);

}
