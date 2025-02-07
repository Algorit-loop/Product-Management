package com.example.demoweb.Repository;

import com.example.demoweb.Entity.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.account = :account")
    boolean existsByAccount(@Param("account") String account);;

    @Query("SELECT u FROM User u WHERE u.account = :account")
    Optional<User> findUserByAccount(@Param("account") String account);

    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findUserById(@Param("id") int id);
}
