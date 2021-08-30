package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.InsTestSeriesQuestions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TestSeriesQuestionDto {

    private InsTestSeriesQuestions question;
    private String userResponse=null;
    private String status=null;//correct , wrong or unattempted

    public TestSeriesQuestionDto(InsTestSeriesQuestions question) {
        this.question = question;
    }
}
