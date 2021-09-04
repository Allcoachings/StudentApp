package com.allcoaching.AllCoachingRestApi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SalesOverViewDataDto {

    private long courseId;
    private long total;
    private String courseName;
    private float courseFee;
    private float totalCourseRevenue;

    public SalesOverViewDataDto(long courseId, long total) {
        this.courseId = courseId;
        this.total = total;
    }
}
