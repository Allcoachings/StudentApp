package com.allcoaching.restApi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserDaoservice userDaoservice;

    @GetMapping("/users")
    public List<User> findAll()
    {
        return userDaoservice.finaAll();
    }
    @GetMapping("/users/{id}")
    public User findOne(@PathVariable  UUID id)
    {
        User user =  userDaoservice.findOne(id);
        if(user==null)
        {
            throw new UserNotFoundExecton("id = "+id);
        }

        return user;

    }

    @PostMapping("/users")
    public ResponseEntity<Object> save(@RequestBody User user)
    {
        User newUser= userDaoservice.save(user);
        URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(newUser.getId())
                        .toUri();
        return ResponseEntity.created(location).build();
    }
}
