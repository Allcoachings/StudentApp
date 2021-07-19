package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Admin;
import com.allcoaching.AllCoachingRestApi.Respository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {


    @Autowired
    private AdminRepo adminRepo;

    public boolean authCheck(Admin admin)
    {
            return adminRepo.findByEmailAndPassword(admin.getEmail(),admin.getPassword());
    }

}
