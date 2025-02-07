package com.example.demoweb.Service;

import com.example.demoweb.Entity.Product;
import com.example.demoweb.Repository.ProductRepository;
import com.example.demoweb.dto.request.ProductCreation;
import com.example.demoweb.dto.request.ProductUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(ProductCreation request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setDiscount(request.getDiscount());
        product.setCreateAt(new Date());
        product.setImageFileName(request.getImageFileName());
        return productRepository.save(product);
    }
    public Product updateProduct(String productId, ProductUpdateRequest request) {
        Product product = getProductById(productId);
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setDiscount(request.getDiscount());
        return productRepository.save(product);
    }
    public boolean deleteProduct(String productId){
        try{
            Product product = getProductById(productId);
            productRepository.deleteById(productId);
            return true;
        } catch (RuntimeException e){
            return false;
        }
    }
    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public Product getProductById(String Id){
        return productRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
    }
}
