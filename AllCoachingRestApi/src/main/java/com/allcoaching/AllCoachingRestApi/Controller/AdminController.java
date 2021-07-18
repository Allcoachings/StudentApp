package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Admin;
import com.allcoaching.AllCoachingRestApi.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin/")
public class AdminController {

    @Autowired
    private AdminService adminservice;

    @PostMapping("authcheck")
    public boolean authCheck(@RequestBody Admin admin)
    {
        return adminservice.authCheck(admin);
    }
}
