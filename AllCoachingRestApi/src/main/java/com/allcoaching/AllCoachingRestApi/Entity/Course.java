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
public class Course {

    @Id
        @GeneratedValue
    private long id;
    private String title;
    private String description;
    private float fees;
    private long instId;

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
