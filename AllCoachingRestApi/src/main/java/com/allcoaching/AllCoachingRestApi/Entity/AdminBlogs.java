package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@ToString
@Data
@Entity
public class AdminBlogs {

    @Id
    @GeneratedValue
    private long id;

    private String title;
    private String blogBody;
    private String blogFeatureImage;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
     private Date addDate;


    public AdminBlogs(String title, String blogBody, String blogFeatureImage) {
        this.title = title;
        this.blogBody = blogBody;
        this.blogFeatureImage = blogFeatureImage;
    }
}
