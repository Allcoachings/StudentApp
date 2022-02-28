package com.allcoaching.AllCoachingRestApi.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Otp {


    @Id
    @GeneratedValue
    private long id;
    private String mobileNumber;
    private String otpValue;
    private String mobileNumberHash;
    private String otpHash;

    public String getMobileNumberHash() {
        return mobileNumberHash;
    }

    public void setMobileNumberHash(String mobileNumberHash) {
        this.mobileNumberHash = mobileNumberHash;
    }

    public Otp() {
    }

    @Override
    public String toString() {
        return "Otp{" +
                "id=" + id +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", otpValue='" + otpValue + '\'' +
                '}';
    }

    public Otp(String mobileNumber, String otpValue) {
        this.mobileNumber = mobileNumber;
        this.otpValue = otpValue;
    }




    public String getOtpHash() {
        return otpHash;
    }

    public void setOtpHash(String otpHash) {
        this.otpHash = otpHash;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getOtpValue() {
        return otpValue;
    }

    public void setOtpValue(String otpValue) {
        this.otpValue = otpValue;
    }
}
