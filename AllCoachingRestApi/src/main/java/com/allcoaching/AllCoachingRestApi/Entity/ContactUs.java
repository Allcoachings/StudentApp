package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

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

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
}
