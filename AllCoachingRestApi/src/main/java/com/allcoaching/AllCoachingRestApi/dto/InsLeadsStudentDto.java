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
    private String studentEmail;
    private String studentMobile;
    public InsLeadsStudentDto(long studentId, String studentName, String studentImage, String studentUniqueId) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentImage = studentImage;
        this.studentUniqueId = studentUniqueId;
    }


}
