package com.allcoaching.restApi;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class UserDaoServiceClass {

    @PersistenceContext
    private EntityManager entityManager;

    public  long insert(UserEntity user){

        entityManager.persist(user);
        return user.getId();
    }
}
