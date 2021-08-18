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
public class CourseDocument {
    @Id
    @GeneratedValue
    private long id;

    private  String fileAddress;
    private String name;
    private long courseId;
    private long playlistId;
    private boolean published;
    private boolean hidden;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    public CourseDocument( String fileAddress, String name, long courseId,long playlistId) {
        this.fileAddress = fileAddress;
        this.name = name;
        this.playlistId = playlistId;
        this.courseId = courseId;
    }
}
