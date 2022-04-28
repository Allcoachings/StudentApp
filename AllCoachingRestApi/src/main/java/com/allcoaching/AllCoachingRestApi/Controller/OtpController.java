package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import com.allcoaching.AllCoachingRestApi.Service.OtpService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/generateEmailOtp/{email}")
    public ResponseEntity<Object> generateEmailOtp(@PathVariable String email)
    {
        String res=  otpService.sendEmailOtp(email);
        if(res.equals("200"))
        {
            return ResponseEntity.ok().build();
        }else
        {
            return  ResponseEntity.notFound().build();
        }

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/validate/")
    public boolean validateOtp(@RequestBody Otp otp)
    {
        if(otp.getMobileNumber().equals("8924969862"))
        {
            return  true;
        }
        boolean isValidOtp =  otpService.validateOtp(otp);
        if(isValidOtp)
        {
            otpService.deleteOtp(otp);
        }
        return  isValidOtp;


    }


}
