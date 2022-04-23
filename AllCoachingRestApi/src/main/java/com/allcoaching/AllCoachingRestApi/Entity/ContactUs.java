package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@Entity
public class ContactUs {
    @GeneratedValue
    @Id
    private long id;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String name;
    private String email;
    private String phone;
    private  String designation;
}
