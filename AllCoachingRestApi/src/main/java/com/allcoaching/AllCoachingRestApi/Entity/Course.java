package com.allcoaching.AllCoachingRestApi.Entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;



@Data
@NoArgsConstructor
@ToString
@Entity
public class Course {

    @Id
    @GeneratedValue
    private long id;
    private String title;


    @Column(columnDefinition = "TEXT")
    private String description;

    private float fees;
    private long instId;
    private long leads=0;
    private boolean isDeleted=false;

    public Course(String title, String description, float fees, long instId) {
        this.title = title;
        this.description = description;
        this.fees = fees;
        this.instId = instId;
    }

}
/*
*
* Course c = new Course()
* c.id
* */
