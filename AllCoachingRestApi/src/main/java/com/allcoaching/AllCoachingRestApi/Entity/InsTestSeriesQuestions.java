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
public class InsTestSeriesQuestions {

    @Id
    @GeneratedValue
    private  long id;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOpt;
    private String explanation;
    private int correctMarks;
    private int wrongMarks;
    private long testSeriesId;

    public InsTestSeriesQuestions(String question, String optionA, String optionB, String optionC, String optionD, String correctOpt, String explanation, int correctMarks,int wrongMarks,long testSeriesId)
    {
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOpt = correctOpt;
        this.explanation = explanation;
        this.testSeriesId = testSeriesId;
        this.correctMarks=correctMarks;
        this.wrongMarks = wrongMarks;
    }

}
