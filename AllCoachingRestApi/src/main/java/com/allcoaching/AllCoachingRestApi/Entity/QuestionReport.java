package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@ToString
@Data
@NoArgsConstructor
@Entity
public class QuestionReport {
    @Id
    @GeneratedValue
    private  long id;

    private String text;
    private String description;

    @OneToOne(targetEntity = InsTestSeriesQuestions.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="questionId",referencedColumnName = "id")
    private InsTestSeriesQuestions question;

    @OneToOne(targetEntity = InsTestSeries.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="testSeriesId",referencedColumnName = "id")
    private InsTestSeries testseries;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportUpdateDate;


}
