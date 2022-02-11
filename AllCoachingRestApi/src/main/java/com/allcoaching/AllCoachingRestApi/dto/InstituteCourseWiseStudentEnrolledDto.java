package com.allcoaching.AllCoachingRestApi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class InstituteCourseWiseStudentEnrolledDto {

    private String name;
    private String email;
    private String mobileNumber;
    private String courseName;

}
