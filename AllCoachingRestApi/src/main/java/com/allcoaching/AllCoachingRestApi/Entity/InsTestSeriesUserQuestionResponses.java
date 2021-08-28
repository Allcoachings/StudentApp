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
    private String userResponse;

    @ManyToOne(optional = true)
    @JoinColumn(  name = "brief_id"  )
    private InsTestSeriesUserResponseBrief brief;
    private String status;//correct , wrong or unattempted


}
