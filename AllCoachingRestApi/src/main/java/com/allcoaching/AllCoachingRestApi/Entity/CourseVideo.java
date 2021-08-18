package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.util.Date;


@Data
@NoArgsConstructor
@ToString
@Entity
public class CourseVideo {

    @Id
    @GeneratedValue
    private long id;
    private String videoLocation;
    private String category;
    private String name;
    private String description;
//    private String date;
    private  boolean isDemo;
    private  String demoLenght;
    private long courseId;
    private long playlistId;
    private boolean published;
    private boolean hidden;
    private String videoThumb="https://i.stack.imgur.com/PtbGQ.png";


    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;


//    @ManyToOne
//    @JoinColumn(name = "playlistId")
//    private VideoPlaylist videoPlaylist;

    public CourseVideo(String videoLocation, String name, String description, boolean isDemo, String demoLenght, long courseId,long playlistId) {
        this.videoLocation = videoLocation;
        this.name = name;
        this.description = description;
        this.isDemo = isDemo;
        this.demoLenght = demoLenght;
        this.courseId = courseId;
        this.playlistId = playlistId;
    }



}
