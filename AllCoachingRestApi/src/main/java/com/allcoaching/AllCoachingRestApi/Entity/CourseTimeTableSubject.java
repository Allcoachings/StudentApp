package com.allcoaching.AllCoachingRestApi.Entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@ToString
@NoArgsConstructor
@Entity
public class CourseTimeTableSubject {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    private long courseId;




}
