package com.allcoaching.AllCoachingRestApi.dto;


import com.allcoaching.AllCoachingRestApi.Entity.CourseTimeTableItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CourseTimeTableDto {
    private long id;
    private String name;
    private Iterable<CourseTimeTableItem> courseTimeTableItem;
}
