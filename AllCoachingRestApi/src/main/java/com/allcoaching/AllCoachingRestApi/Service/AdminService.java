package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Admin;
import com.allcoaching.AllCoachingRestApi.Entity.AdminConfig;
import com.allcoaching.AllCoachingRestApi.Respository.AdminConfigRepo;
import com.allcoaching.AllCoachingRestApi.Respository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {


    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AdminConfigRepo adminConfigRepo;

    public boolean authCheck(Admin admin)
    {
            return adminRepo.findByEmailAndPassword(admin.getEmail(),admin.getPassword());
    }


    public AdminConfig  updateConfig(AdminConfig config)
    {
        return  adminConfigRepo.save(config);
    }

    public AdminConfig getConfig()
    {
        Iterable<AdminConfig> adminConfigs = adminConfigRepo.findAll();
        return adminConfigs.iterator().next();
    }
}
