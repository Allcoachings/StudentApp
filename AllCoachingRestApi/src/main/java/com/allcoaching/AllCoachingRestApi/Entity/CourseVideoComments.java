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
public class CourseVideoComments {

    @Id
    @GeneratedValue
    private long id;

    private String comment;
    @OneToOne(targetEntity = Student.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="studentId",referencedColumnName = "id")
    private Student student;

    private long videoId;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentTime;

}
