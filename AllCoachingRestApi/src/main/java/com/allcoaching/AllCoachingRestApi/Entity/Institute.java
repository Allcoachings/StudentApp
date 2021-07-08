package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
@Entity
public class Institute {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String  directorName;
    private String email;
    private String phone;
    private String password;
    private String address;
    private String city;
    private String state;
    private long category;
    private String about;
    private String logo;
    private int status;
    private long followersCount =0;
    private int fiveStarCount =0;
    private int fourStarCount =0;
    private int threeStarCount =0;
    private int twoStarCount =0;
    private int oneStarCount =0 ;
    private int totalRatingCount=0;
    private int totalRating=0;

    public Institute(String name, String directorName, String email, String phone, String password, String address, String city, String state, long category, String about, String logo, int status) {

        this.name = name;
        this.directorName = directorName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.address = address;
        this.city = city;
        this.state = state;
        this.category = category;
        this.about = about;
        this.logo = logo;
        this.status = status;

    }
}