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
public class TestSeriesQuestionResponse {

    @Id
    @GeneratedValue
    private long id;

    private long testSeriesId;
    private long studentId;
    private long testSeriesQuestionId;
    private boolean isCorrect;

    public TestSeriesQuestionResponse(long testSeriesId, long studentId, long testSeriesQuestionId, boolean isCorrect) {
        this.testSeriesId = testSeriesId;
        this.studentId = studentId;
        this.testSeriesQuestionId = testSeriesQuestionId;
        this.isCorrect = isCorrect;
    }
}
