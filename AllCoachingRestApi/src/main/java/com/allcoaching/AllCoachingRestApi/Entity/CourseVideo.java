package com.allcoaching.AllCoachingRestApi.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
@ToString
@Entity
public class CourseVideo {

    @Id
    @GeneratedValue
    private long id;

    @Column(columnDefinition = "TEXT")
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
    private long views;

    private String liveClassDate;


    private String liveClassTime;

    @Column(columnDefinition = "TEXT")
    private String videoFormatJson;
    private String videoType ="offline";//live,offline
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

    public CourseVideo(String videoLocation, String name, String description, boolean isDemo, String demoLenght, long courseId,long playlistId,String videoThumb) {
        this.videoLocation = videoLocation;
        this.name = name;
        this.description = description;
        this.isDemo = isDemo;
        this.demoLenght = demoLenght;
        this.courseId = courseId;
        this.playlistId = playlistId;
        this.videoThumb = videoThumb;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InsTestSeriesQuestions )) return false;
        return id ==(((InsTestSeriesQuestions) o).getId());
    }
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }



}
