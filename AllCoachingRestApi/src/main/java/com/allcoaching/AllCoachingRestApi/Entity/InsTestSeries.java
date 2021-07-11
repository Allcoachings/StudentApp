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
public class InsTestSeries {
    
    @Id
    @GeneratedValue
    private long id;
    private String title;
    private int questionCount;
    private int timeDuration;
    private boolean isPractice;
    private long courseId;

    public InsTestSeries(String title, int questionCount, int timeDuration, boolean isPractice) 
    {
        this.title = title;
        this.questionCount = questionCount;
        this.timeDuration = timeDuration;
        this.isPractice = isPractice;
    }
}
