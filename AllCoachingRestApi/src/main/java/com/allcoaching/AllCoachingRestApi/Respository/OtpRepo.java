package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface OtpRepo extends CrudRepository<Otp,Long> {
    Optional<Otp> findByOtpValue(String otpValue);
    Optional<Otp> findByOtpHash(String otpHash);
    void deleteAllByMobileNumber(String MobileNumber);
}
