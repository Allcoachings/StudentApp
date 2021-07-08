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
public class VideoPlaylist {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    private long courseId;
//    @ManyToMany(targetEntity = CourseVideo.class,cascade = {CascadeType.MERGE,CascadeType.PERSIST})
//    @JoinColumn(name = "playlistId",referencedColumnName = "id")
//    private List<CourseVideo> courseVideos;

    public VideoPlaylist(String name,long courseId) {
        this.name = name;
        this.courseId=courseId;
    }

}
