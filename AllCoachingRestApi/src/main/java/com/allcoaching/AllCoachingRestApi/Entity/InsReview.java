package com.allcoaching.AllCoachingRestApi.Entity;


import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import com.allcoaching.AllCoachingRestApi.dto.SalesOverViewDataDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@Entity
@DynamicUpdate

@NamedNativeQuery(
        name = "insRevenueGraphDataWeekly",
        query ="SELECT WEEK(time) as x,COUNT(*) as y FROM ins_review "+
                "WHERE ins_id=:insId and MONTH(time)=:dataMonth GROUP BY MONTH(time),WEEK(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)


@NamedNativeQuery(
        name = "insRevenueGraphDataMonthly",
        query ="SELECT MONTH(time) as x,COUNT(*) as y FROM ins_review "+
                "WHERE ins_id=:insId and YEAR(time)=:dataYear GROUP BY YEAR(time),MONTH(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)

@NamedNativeQuery(
        name = "insRevenueGraphDataYearly",
        query ="SELECT YEAR(time) as x,COUNT(*) as y FROM ins_review "+
                "WHERE ins_id=:insId   GROUP BY YEAR(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)

@NamedNativeQuery(
        name = "adminRevenueGraphDataWeekly",
        query ="SELECT WEEK(time) as x,COUNT(*) as y FROM ins_review "+
                "WHERE   MONTH(time)=:dataMonth GROUP BY MONTH(time),WEEK(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)


@NamedNativeQuery(
        name = "adminRevenueGraphDataMonthly",
        query ="SELECT MONTH(time) as x,COUNT(*) as y FROM ins_review "+
                "WHERE   YEAR(time)=:dataYear GROUP BY YEAR(time),MONTH(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)


@NamedNativeQuery(
        name = "adminRevenueGraphDataYearly",
        query ="SELECT YEAR(time) as x,COUNT(*) as y FROM ins_review "+
                " GROUP BY YEAR(time)"
        ,
        resultSetMapping = "GraphDataDtoRevenue"
)
@SqlResultSetMapping(
        name = "GraphDataDtoRevenue",
        classes = @ConstructorResult(
                targetClass = Graph2dDataDto.class,
                columns = {
                        @ColumnResult(name = "x", type = String.class),
                        @ColumnResult(name = "y", type = String.class),

                }
        )
)

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

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

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
