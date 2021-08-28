package com.allcoaching.AllCoachingRestApi.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Time;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@Entity
public class InsTestSeries {
    
    @Id
    @GeneratedValue
    private long id;
    private String title;
    private int questionCount;
    private int timeDuration;
    private boolean isPractice;
    private int maxMarks;
    private boolean published;
    private boolean hidden;
    private boolean isAdmin;


    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date date;


    @DateTimeFormat(pattern = "HH:mm")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="HH:mm", timezone = "UTC")
    private Time time;
    private long category;
    private long courseId;
    private long playlistId;

    public InsTestSeries(String title, int questionCount, int timeDuration, boolean isPractice, int maxMarks, boolean isAdmin, Date date, Time time, long category, long courseId, long playlistId) {
        this.title = title;
        this.questionCount = questionCount;
        this.timeDuration = timeDuration;
        this.isPractice = isPractice;
        this.maxMarks = maxMarks;
        this.isAdmin = isAdmin;
        this.date = date;
        this.time = time;
        this.category = category;
        this.courseId = courseId;
        this.playlistId = playlistId;
    }


}
