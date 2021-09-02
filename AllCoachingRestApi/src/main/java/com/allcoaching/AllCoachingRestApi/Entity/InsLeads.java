package com.allcoaching.AllCoachingRestApi.Entity;

import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@ToString
@Entity
@NamedNativeQuery(
        name = "insLeadGraphDataWeekly",
        query ="SELECT WEEK(time) as x,COUNT(*) as y FROM ins_leads "+
                "WHERE ins_id=:insId and MONTH(time)=:dataMonth GROUP BY MONTH(time),WEEK(time)"
        ,
        resultSetMapping = "GraphDataDto"
)


@NamedNativeQuery(
        name = "insLeadGraphDataMonthly",
        query ="SELECT MONTH(time) as x,COUNT(*) as y FROM ins_leads "+
                "WHERE ins_id=:insId and YEAR(time)=:dataYear GROUP BY YEAR(time),MONTH(time)"
        ,
        resultSetMapping = "GraphDataDto"
)

@NamedNativeQuery(
        name = "insLeadGraphDataYearly",
        query ="SELECT YEAR(time) as x,COUNT(*) as y FROM ins_leads "+
                "WHERE ins_id=:insId   GROUP BY YEAR(time)"
        ,
        resultSetMapping = "GraphDataDto"
)

@NamedNativeQuery(
        name = "adminLeadGraphDataWeekly",
        query ="SELECT WEEK(time) as x,COUNT(*) as y FROM ins_leads "+
                "WHERE   MONTH(time)=:dataMonth GROUP BY MONTH(time),WEEK(time)"
        ,
        resultSetMapping = "GraphDataDto"
)


@NamedNativeQuery(
        name = "adminLeadGraphDataMonthly",
        query ="SELECT MONTH(time) as x,COUNT(*) as y FROM ins_leads "+
                "WHERE   YEAR(time)=:dataYear GROUP BY YEAR(time),MONTH(time)"
        ,
        resultSetMapping = "GraphDataDto"
)


@NamedNativeQuery(
        name = "adminLeadGraphDataYearly",
        query ="SELECT YEAR(time) as x,COUNT(*) as y FROM ins_leads "+
                " GROUP BY YEAR(time)"
        ,
        resultSetMapping = "GraphDataDto"
)
@SqlResultSetMapping(
        name = "GraphDataDto",
        classes = @ConstructorResult(
                targetClass = Graph2dDataDto.class,
                columns = {
                        @ColumnResult(name = "x", type = String.class),
                        @ColumnResult(name = "y", type = String.class),

                }
        )
)
public class InsLeads {

    @Id
    @GeneratedValue
    private long id;

    private  long insId;
    private long userId;
    private long courseId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

}
