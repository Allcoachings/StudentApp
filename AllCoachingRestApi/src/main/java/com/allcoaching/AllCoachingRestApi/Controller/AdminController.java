package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Admin;
import com.allcoaching.AllCoachingRestApi.Entity.AdminConfig;
import com.allcoaching.AllCoachingRestApi.Service.AdminService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/v1/admin/")
@Api()
public class AdminController {

    @Autowired
    private AdminService adminservice;


    @CrossOrigin(origins = "*")
    @PostMapping("authcheck")
    public boolean authCheck(@RequestBody Admin admin)
    {
        return adminservice.authCheck(admin);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateConfig")
    public ResponseEntity<Object> updateConfig(@RequestBody AdminConfig adminConfig)
    {
        AdminConfig adminConfig_saved =  adminservice.updateConfig(adminConfig);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(adminConfig_saved.getId()).toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getConfig")
    public @ResponseBody AdminConfig getConfig()
    {
        return adminservice.getConfig();
    }


}
