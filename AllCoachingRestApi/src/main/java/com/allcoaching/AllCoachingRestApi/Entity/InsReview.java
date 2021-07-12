package com.allcoaching.AllCoachingRestApi.Entity;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@Entity
@DynamicUpdate
public class InsReview {

    @Id
    @GeneratedValue
    private long id;
    private long courseId;
    private long insId;
    private long studentId;
    private int rating;
    private String review;
    private String reply;


    public InsReview(long courseId, long insId, long studentId, int rating, String review) {
        this.courseId = courseId;
        this.insId = insId;
        this.studentId = studentId;
        this.rating = rating;
        this.review = review;
    }

    public InsReview(long id, String reply) {
        this.id = id;
        this.reply = reply;
    }

    public InsReview(long courseId, long insId, long studentId)
    {
        this.courseId = courseId;
        this.insId = insId;
        this.studentId = studentId;
    }

    public InsReview(long courseId, long studentId, String review, int rating) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.review = review;
        this.rating = rating;
    }
}
