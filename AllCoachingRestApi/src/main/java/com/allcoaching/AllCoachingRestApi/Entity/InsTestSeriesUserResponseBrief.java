package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@ToString
@Entity
public class InsTestSeriesUserResponseBrief {


    @Id
    @GeneratedValue
    private long id;
    private long studentId;
    private long testSeriesId;
    private long score;
    private int correctQues;
    private int wrongQues;
    private int skippedQues;
    private String accuracy;
    private String percentile;
    private String timeTaken;

    @OneToMany(mappedBy = "brief")
    private List<InsTestSeriesUserQuestionResponses> userQuestionResponses;

    public void addInsTestSeriesUserQuestionResponses(List<InsTestSeriesUserQuestionResponses> insTestSeriesUserQuestionResponses){
        insTestSeriesUserQuestionResponses.forEach(item->{
           item.setBrief(this);
        });
        userQuestionResponses=insTestSeriesUserQuestionResponses;

    }
    public void removeInsTestSeriesUserQuestionResponses(List<InsTestSeriesUserQuestionResponses> insTestSeriesUserQuestionResponses){
        insTestSeriesUserQuestionResponses.forEach(item->{item.setBrief(null);});
        userQuestionResponses=insTestSeriesUserQuestionResponses;

    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InsTestSeriesQuestions )) return false;
        return id ==(((InsTestSeriesQuestions) o).getId());
    }
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }





}
