package com.example.demoweb.Controllers;

import ch.qos.logback.core.model.Model;
import com.example.demoweb.Entity.Product;
import com.example.demoweb.Repository.ProductRepository;
import com.example.demoweb.Service.ProductService;
import com.example.demoweb.dto.request.ApiResponse;
import com.example.demoweb.dto.request.ProductCreation;
import com.example.demoweb.dto.request.ProductUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @PostMapping("/crproduct")
    ApiResponse<Product> createProduct(@RequestBody ProductCreation request){
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        try{
            apiResponse.setResult(productService.createProduct(request));
            apiResponse.setMessage("OK");
        } catch (Exception e) {
            apiResponse.setMessage("Can't not create a Product");
            apiResponse.setCode(500);
        }
        return apiResponse;
    }
    @GetMapping("/products")
    ApiResponse<List<Product>> getAllProduct() {
        ApiResponse<List<Product>> apiResponse = new ApiResponse<>();
        try {
            List<Product> products = productService.getAllProduct();
            apiResponse.setResult(products);
            apiResponse.setMessage("OK");
            apiResponse.setCode(200);
        } catch (Exception e) {
            apiResponse.setMessage("Lỗi khi lấy danh sách sản phẩm");
            apiResponse.setCode(500);
        }
        return apiResponse;
    }


    @GetMapping("/product/{productId}")
    ApiResponse <Product> getProductById(@PathVariable String productId) {
        ApiResponse <Product> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.getProductById(productId));
        apiResponse.setMessage("OK");
        return apiResponse;
    }
//    Product getProductById(@PathVariable String productId){
//        return productService.getProductById(productId);
//    }
    @PutMapping("/product/{productId}")
    ApiResponse<Product> updateProduct(@PathVariable String productId, @RequestBody ProductUpdateRequest request){
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setResult((productService.updateProduct(productId, request)));
        apiResponse.setCode(200);
        apiResponse.setMessage("OK");
        return apiResponse;
    }
//    Product updateProduct(@PathVariable String productId, @RequestBody ProductUpdateRequest request){
//        return productService.updateProduct(productId, request);
//    }
    @DeleteMapping("/product/{productId}")
    ApiResponse<Boolean> deleteProduct(@PathVariable String productId){
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.deleteProduct(productId));
        if (apiResponse.getResult().equals(Boolean.FALSE)){
            apiResponse.setCode(500);
            apiResponse.setMessage("Can not delete product");
        } else {
            apiResponse.setMessage("OK");
        }
        return apiResponse;
    }
//    String deleteProduct(@PathVariable String productId){
//        productService.deleteProduct(productId);
//        return "Product has been deleted";
//    }
}
