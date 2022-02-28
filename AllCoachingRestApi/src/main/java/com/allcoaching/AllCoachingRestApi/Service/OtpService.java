package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import com.allcoaching.AllCoachingRestApi.Respository.OtpRepo;
import com.allcoaching.AllCoachingRestApi.Utils.SendSms;
import com.allcoaching.AllCoachingRestApi.Utils.Sms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepo otpRepo;


    public Otp save(Otp otp)
    {
        return otpRepo.save(otp);
    }
    public Otp generateOtp(String mobileNumber)
    {
        Random random = new Random();
        int suffix = 100000 + random.nextInt(900000);
        long prefix=otpRepo.count()+1;
        String otp = prefix+""+suffix;
        otp = otp.substring(0,6);

        if(!mobileNumber.contains("@"))
        {
            SendSms sms = new SendSms();
            sms.sendOptOverMessage(mobileNumber,otp);
        }

        return otpRepo.save(new Otp(mobileNumber,otp));
    }

    public Optional<Otp> findByOtpHash(String hash)
    {
        return otpRepo.findByOtpHash(hash);
    }
    public boolean validateOtp(Otp otp)
    {
        Optional<Otp> otpObj = otpRepo.findByOtpValue(otp.getOtpValue());

        return otpObj.filter(value -> otp.getMobileNumber().equals(value.getMobileNumber())).isPresent();
    }

    public boolean validateOtpHash(Otp otp)
    {
        Optional<Otp> otpObj = otpRepo.findByOtpHash(otp.getOtpHash());

        return otpObj.filter(value -> otp.getMobileNumberHash().equals(value.getMobileNumberHash())).isPresent();
    }

    public void deleteOtp(Otp otp)
    {
        otpRepo.deleteAllByMobileNumber(otp.getMobileNumber());
    }
}
