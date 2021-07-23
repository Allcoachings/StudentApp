package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InsLeadsStudentDto {


    private long studentId;
    private String studentName;
    private String studentImage;
    private String studentUniqueId;
}
