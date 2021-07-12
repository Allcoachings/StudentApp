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
public class TestSeriesPlaylist {
    @Id
    @GeneratedValue
    private long id;

    private String name;

    private long courseId;

    public TestSeriesPlaylist(String name, long courseId) {
        this.name = name;
        this.courseId = courseId;
    }
}
