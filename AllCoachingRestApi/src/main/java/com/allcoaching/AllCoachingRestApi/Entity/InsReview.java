package com.allcoaching.AllCoachingRestApi.Entity;


import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import com.allcoaching.AllCoachingRestApi.dto.SalesOverViewDataDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@Entity
@DynamicUpdate
@NamedNativeQuery(
        name = "salesOverview",
        query ="SELECT course_id,COUNT(course_id) as total  FROM ins_review "+
                " WHERE   ins_id=:insId GROUP BY course_id,ins_id"
        ,
        resultSetMapping = "salesOverViewDataDto"
)
@SqlResultSetMapping(
        name = "salesOverViewDataDto",
        classes = @ConstructorResult(
                targetClass = SalesOverViewDataDto.class,
                columns = {
                        @ColumnResult(name = "course_id", type = Long.class),
                        @ColumnResult(name = "total", type = Long.class),
                }
        )
)
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
