package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import com.allcoaching.AllCoachingRestApi.Service.OtpService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/v1/otp/")
@Api(value="student",description = "Otp controller for student login")
public class OtpController {

    @Autowired
    OtpService otpService;

    @CrossOrigin(origins = "*")
    @GetMapping("/generate/{mobileNumber}")
    public Otp generateOtp(@PathVariable String mobileNumber)
    {
        return otpService.generateOtp(mobileNumber);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/validate/")
    public boolean validateOtp(@RequestBody Otp otp)
    {
        boolean isValidOtp =  otpService.validateOtp(otp);
        if(isValidOtp)
        {
            otpService.deleteOtp(otp);
        }
//        return  isValidOtp;

        return true;
    }


}
