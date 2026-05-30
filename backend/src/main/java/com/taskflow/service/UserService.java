package com.taskflow.service;

import com.taskflow.dto.response.UserResponse;
import com.taskflow.mapper.UserMapper;
import com.taskflow.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final SecurityUtils securityUtils;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public UserResponse getCurrentUserProfile() {
        return userMapper.toResponse(securityUtils.getCurrentUser());
    }
}
