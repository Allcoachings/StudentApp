package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@Entity
public class InsTestSeriesQuestions {

    @Id
    @GeneratedValue
    private  long id;
    @Column(columnDefinition = "TEXT")
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOpt;
    private String explanation;
//    private float correctMarks;
//    private float wrongMarks;
    private int questionType;//1 for question type text,2 image only question,3 text with question,4 image with question
    private int optionType;//1 text option,2 for image options
    private long testSeriesId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public InsTestSeriesQuestions(String question, String optionA, String optionB, String optionC, String optionD, String correctOpt, String explanation,   int questionType, int optionType, long testSeriesId) {
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctOpt = correctOpt;
        this.explanation = explanation;
        this.questionType = questionType;
        this.optionType = optionType;
        this.testSeriesId = testSeriesId;
    }
}
