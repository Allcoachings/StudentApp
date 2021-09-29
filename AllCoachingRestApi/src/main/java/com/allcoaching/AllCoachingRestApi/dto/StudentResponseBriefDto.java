package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesUserResponseBrief;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseBriefDto {

    private Student student;
    private InsTestSeriesUserResponseBrief responseBrief;
}
