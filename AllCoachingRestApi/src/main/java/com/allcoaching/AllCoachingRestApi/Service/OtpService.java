package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import com.allcoaching.AllCoachingRestApi.Respository.OtpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepo otpRepo;

    public Otp generateOtp(String mobileNumber)
    {
        Random random = new Random();
        int suffix = 100000 + random.nextInt(900000);
        long prefix=otpRepo.count()+1;
        String otp = prefix+""+suffix;
        otp = otp.substring(0,6);
        return otpRepo.save(new Otp(mobileNumber,otp));
    }

    public boolean validateOtp(Otp otp)
    {
        Optional<Otp> otpObj = otpRepo.findByOtpValue(otp.getOtpValue());

        return otpObj.filter(value -> otp.getMobileNumber().equals(value.getMobileNumber())).isPresent();
    }

    public void deleteOtp(Otp otp)
    {
        otpRepo.deleteAllByMobileNumber(otp.getMobileNumber());
    }
}
