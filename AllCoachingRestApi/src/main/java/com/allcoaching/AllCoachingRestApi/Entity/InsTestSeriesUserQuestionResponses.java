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

    private long questionId;
    private long userResponse;
    @ManyToOne(fetch = FetchType.LAZY)
    private InsTestSeriesUserResponseBrief brief;
    private String status;//correct , wrong or unattempted


}
