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

    @OneToMany(mappedBy = "brief", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InsTestSeriesUserQuestionResponses> userQuestionResponses;

    public void addInsTestSeriesUserQuestionResponses(InsTestSeriesUserQuestionResponses insTestSeriesUserQuestionResponses){
        userQuestionResponses.add(insTestSeriesUserQuestionResponses);
        insTestSeriesUserQuestionResponses.setBrief(this);
    }
    public void removeInsTestSeriesUserQuestionResponses(InsTestSeriesUserQuestionResponses insTestSeriesUserQuestionResponses){
        userQuestionResponses.remove(insTestSeriesUserQuestionResponses);
        insTestSeriesUserQuestionResponses.setBrief(null);
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
