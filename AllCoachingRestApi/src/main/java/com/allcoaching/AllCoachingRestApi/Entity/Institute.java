package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Table;

import javax.persistence.*;
import java.util.Date;
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
    private String uniqueUserId;
    @Column(name="email",unique=true)
    private String email;
    private String phone;
    private String password;
    private String address;
    private String city;
    private String expoToken;
    private String state;
    private long category;
    private String about;
    private String logo;
    private int boostValue=0;
    private int status;
    //1 for approve ,0 for pending 2 for block
    private long followersCount =0;
    private int fiveStarCount =0;
    private int fourStarCount =0;
    private int threeStarCount =0;
    private int twoStarCount =0;
    private int oneStarCount =0 ;
    private int totalRatingCount=0;
    private int totalRating=0;
    private long leads=0;
    private long totalRevenue=0;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date addDate;
    //institute account details
    private String accountNumber;
    private String ifsc;
    private String accountHolderName;
    private String bankName;
    private String upi;


    public Institute(long id) {
        this.id = id;
    }

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
