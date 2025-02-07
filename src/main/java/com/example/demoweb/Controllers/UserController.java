package com.example.demoweb.Controllers;

import com.example.demoweb.Entity.User;
import com.example.demoweb.Service.UserService;
import com.example.demoweb.dto.request.ApiResponse;
import com.example.demoweb.dto.request.UserCreateRequest;
import com.example.demoweb.dto.request.UserUpdateRequest;
import com.example.demoweb.dto.request.UserValidateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/sign-up")
    ApiResponse <User> createUser(@RequestBody UserCreateRequest request){
        ApiResponse <User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }
    @PostMapping("/sign-in")
    ApiResponse <User> userValidation(@RequestBody UserValidateRequest request){
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.userValidation(request));
        return apiResponse;
    }
    @GetMapping("/users")
    ApiResponse <List<User>> getListUser(){
        ApiResponse <List<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getListUser());
        return apiResponse;
    }
    @PutMapping("/updateUser/{userId}")
    ApiResponse <User> updateUser(@PathVariable int userId, @RequestBody UserUpdateRequest request){
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateUser(userId,request));
        return apiResponse;
    }
}
