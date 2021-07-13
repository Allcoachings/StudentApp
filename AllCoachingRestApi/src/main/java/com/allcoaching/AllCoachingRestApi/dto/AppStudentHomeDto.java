package com.allcoaching.AllCoachingRestApi.dto;

import lombok.*;

import java.util.List;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppStudentHomeDto {
    private String title;
    private String type;
    private long id;
    private Iterable data;

}
