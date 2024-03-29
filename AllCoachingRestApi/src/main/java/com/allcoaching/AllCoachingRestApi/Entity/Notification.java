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
public class Notification {
    @Id
    @GeneratedValue
    private long id;
    private String message;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date notificationTime;

    private boolean isSeen=false ;

    private int notificationFor;//1 for ins 2 for student

    private long receiverId;

    private  String notificationFrom; //institute,admin

    private long senderId;
    private String redirectLink;
    private  String type;//general,course
    private String notificationImage;

}
