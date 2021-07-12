package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@ToString
@Entity
public class TestSeriesResponse {
    @Id
    @GeneratedValue
    private long id;

    private long studentId;
    private long testSeriesId;
    private int obtainedMarks;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    public TestSeriesResponse(long studentId, long testSeriesId, int obtainedMarks)
    {
        this.studentId = studentId;
        this.testSeriesId = testSeriesId;
        this.obtainedMarks = obtainedMarks;
    }


}
