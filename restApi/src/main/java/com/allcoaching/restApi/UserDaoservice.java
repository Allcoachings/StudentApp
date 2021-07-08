package com.allcoaching.restApi;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class UserDaoservice {
    private  static List<User> users = new ArrayList<>();
    static {

        users.add(new User(UUID.randomUUID(),"adam",new Date()));
        users.add(new User(UUID.randomUUID(),"pancham",new Date()));
        users.add(new User(UUID.randomUUID(),"rashi",new Date()));
    }
     public List<User> finaAll()
     {
         return users;
     }
    public User save(User user)
    {
        user.setId(UUID.randomUUID());
        users.add(user);
        return user;
    }

    public  User findOne(UUID id)
    {
        for(User user:users)
        {
            if(user.getId().equals(id))
            {
                return user;
            }
        }
        return null;
    }

}
