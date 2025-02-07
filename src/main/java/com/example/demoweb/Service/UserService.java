package com.example.demoweb.Service;

import com.example.demoweb.Entity.User;
import com.example.demoweb.Repository.UserRepository;
import com.example.demoweb.dto.request.UserCreateRequest;
import com.example.demoweb.dto.request.UserUpdateRequest;
import com.example.demoweb.dto.request.UserValidateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(UserCreateRequest request){
        User user = new User();
        boolean existed = userRepository.existsByAccount(request.getAccount());
        if (existed){
            throw new RuntimeException("username existed");
        }
        user.setAccount(request.getAccount());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setDob(request.getDob());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(1);

        return userRepository.save(user);
    }
    public User findUserByAccount(String userAccount) {
        return userRepository.findUserByAccount(userAccount)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getListUser(){
        return userRepository.findAll();
    }
    public User userValidation(UserValidateRequest request){
        User user = findUserByAccount(request.getAccount());
        if (user == null){
            throw new RuntimeException("User not found");
        }
        if (user.getPassword().equals(request.getPassword())){
            return user;
        } else {
            throw new RuntimeException("Wrong password");
        }
    }
    public User getUserById(int userId){
        return userRepository.findUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public User updateUser(int userId, UserUpdateRequest request){
        User user = getUserById(userId);
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setDob(request.getDob());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        return userRepository.save(user);
    }
}
