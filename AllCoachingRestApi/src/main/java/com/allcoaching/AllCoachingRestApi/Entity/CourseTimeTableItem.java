package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@Entity
public class CourseTimeTableItem {

    @Id
    @GeneratedValue
    private long id;

    private String date;
    private String title;
    private String subTitle;
    private String time;
   private long subjectId;

    public CourseTimeTableItem(String date, String title, String subTitle, String time,long subjectId) {
        this.date = date;
        this.title = title;
        this.subTitle = subTitle;
        this.time = time;
        this.subjectId=subjectId;
    }
}
