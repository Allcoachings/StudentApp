package com.allcoaching.AllCoachingRestApi.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "userId",unique = true)
    private String userId;
    @Column(name = "email",unique = true)
    private String email;
    private String name;
    private String stateOfResidence;
    private String mobileNumber;
    private String studentImage;
    private boolean blocked;

    public Student() {
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", stateOfResidence='" + stateOfResidence + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", blocked=" + blocked +
                '}';
    }

    public Student(String userId, String email, String name, String stateOfResidence, String mobileNumber, boolean blocked) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.stateOfResidence = stateOfResidence;
        this.mobileNumber = mobileNumber;
        this.blocked = blocked;
    }

    public long getId() {
        return id;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStateOfResidence() {
        return stateOfResidence;
    }

    public void setStateOfResidence(String stateOfResidence) {
        this.stateOfResidence = stateOfResidence;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
