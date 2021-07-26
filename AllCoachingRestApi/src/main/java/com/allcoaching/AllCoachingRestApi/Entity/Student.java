package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@ToString
@Entity
public class Student {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "userId", unique = true)
    private String userId;

    @Column(name = "email", unique = true)
    private String email;
    private String name;
    private String stateOfResidence;
    private String mobileNumber;
    private String studentImage;
    private boolean blocked;

    public Student(String userId, String email, String name, String stateOfResidence, String mobileNumber, String studentImage, boolean blocked) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.stateOfResidence = stateOfResidence;
        this.mobileNumber = mobileNumber;
        this.studentImage = studentImage;
        this.blocked = blocked;
    }

    public Student(long id, String userId, String email, String name, String stateOfResidence, String mobileNumber, String studentImage, boolean blocked) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.stateOfResidence = stateOfResidence;
        this.mobileNumber = mobileNumber;
        this.studentImage = studentImage;
        this.blocked = blocked;
    }
}