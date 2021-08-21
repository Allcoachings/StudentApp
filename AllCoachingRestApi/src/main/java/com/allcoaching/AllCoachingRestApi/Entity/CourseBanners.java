package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


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
