package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@Entity
public class CourseGoLive {
    @Id
    @GeneratedValue
    private long id;

    private  String link;
    private String time;
    private String date;
    private String title;
    private long courseId;
    private String videoUrlJson;

    public CourseGoLive(String link, String time, String date, String title, long courseId,String videoUrlJson) {
        this.link = link;
        this.time = time;
        this.date = date;
        this.title = title;
        this.videoUrlJson = videoUrlJson;
        this.courseId = courseId;
    }
}
