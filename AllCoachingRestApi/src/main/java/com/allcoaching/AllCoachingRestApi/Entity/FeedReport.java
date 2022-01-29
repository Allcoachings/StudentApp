package com.allcoaching.AllCoachingRestApi.Entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@Entity
public class FeedReport {

    @Id
    @GeneratedValue
    private  long id;

    private String text;
    private String description;


    @OneToOne(targetEntity = Feed.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="feedId",referencedColumnName = "id")
    private Feed feed;


    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportUpdateDate;
}
