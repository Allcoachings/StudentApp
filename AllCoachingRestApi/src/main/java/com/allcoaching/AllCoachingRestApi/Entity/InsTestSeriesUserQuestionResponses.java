package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@Entity
public class InsTestSeriesUserQuestionResponses {

    @Id
    @GeneratedValue
    private long id;

//    private long questionId;
    @OneToOne(targetEntity = InsTestSeriesQuestions.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="questionId",referencedColumnName = "id")
    private InsTestSeriesQuestions question;
    private String userResponse;
    private String status;//correct,wrong or unattempted


}
