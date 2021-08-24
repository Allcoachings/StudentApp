package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Data
@ToString
@NoArgsConstructor
@Entity
public class FeedComments {

    @Id
    @GeneratedValue
    private long id;

    private String comment;
    private long feedId;
    private int commentor;//1 for ins 2 for student
    private long insId;
    private long user_id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date timeStamp;
}
