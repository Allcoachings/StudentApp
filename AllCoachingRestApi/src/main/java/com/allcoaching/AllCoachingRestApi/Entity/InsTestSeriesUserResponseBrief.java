package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
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
    private String timeLeft;
    private long rank;
    private int status;//completed==2,paused==1

    @OneToMany(targetEntity = InsTestSeriesUserQuestionResponses.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="brief_fk",referencedColumnName = "id")
    private List<InsTestSeriesUserQuestionResponses> userQuestionResponses= new ArrayList<>();



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
