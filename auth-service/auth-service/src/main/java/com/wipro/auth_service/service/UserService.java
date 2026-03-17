package com.wipro.auth_service.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.auth_service.dto.RegisterRequest;
import com.wipro.auth_service.entity.User;
import com.wipro.auth_service.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            return "Email already registered";
        }

        if (request.getPassword() == null || request.getConfirmPassword() == null ||
                !request.getPassword().equals(request.getConfirmPassword())) {
            return "Password and confirm password do not match";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }

    public User loginUser(String email, String password) {

    Optional<User> optionalUser = userRepository.findByEmail(email);

    if(optionalUser.isEmpty()){
        throw new RuntimeException("Invalid email or password");
    }

    User user = optionalUser.get();

    if(!user.getPassword().equals(password)){
        throw new RuntimeException("Invalid email or password");
    }

    return user;
}public User loginUser1(String email, String password) {

    Optional<User> optionalUser = userRepository.findByEmail(email);

    if(optionalUser.isEmpty()){
        throw new RuntimeException("Invalid email or password");
    }

    User user = optionalUser.get();

    if(!user.getPassword().equals(password)){
        throw new RuntimeException("Invalid email or password");
    }

    return user;
}
}