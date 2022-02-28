package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;


@Data
@ToString
@NoArgsConstructor
@Entity
public class CourseBanners {

    @Id
    @GeneratedValue
    private long id;

    private String bannerImageLink;
    private String bannerLink;
    private String placeHolder;
    private boolean published;
    private long courseId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date addDate;


    public CourseBanners(String bannerImageLink, String bannerLink, String placeHolder, long courseId) {
        this.bannerImageLink = bannerImageLink;
        this.bannerLink = bannerLink;
        this.placeHolder = placeHolder;
        this.courseId = courseId;
    }

    public CourseBanners(String bannerImageLink, long courseId) {
        this.bannerImageLink = bannerImageLink;
        this.courseId = courseId;
    }
}
