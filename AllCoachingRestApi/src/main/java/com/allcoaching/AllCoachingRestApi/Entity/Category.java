package com.allcoaching.AllCoachingRestApi.Entity;

import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor


@NamedNativeQuery(
    name = "studentCountCategoryWise",
    query ="SELECT c.name as x,COUNT(*) as y FROM category c,ins_review ir,institute i "+
            "where ir.ins_id=i.id and i.category=c.id GROUP BY c.id"
    ,
    resultSetMapping = "CatWiseGraphDataDto"
)

@NamedNativeQuery(
        name = "InsCountCategoryWise",
        query ="SELECT c.name as x,COUNT(*) as y FROM category c,institute i "+
                "where  i.category=c.id GROUP BY c.id"
        ,
        resultSetMapping = "CatWiseGraphDataDto"
)
@SqlResultSetMapping(
    name = "CatWiseGraphDataDto",
    classes = @ConstructorResult(
            targetClass = Graph2dDataDto.class,
            columns = {
                    @ColumnResult(name = "x", type = String.class),
                    @ColumnResult(name = "y", type = String.class),

            }
    )
)
@Entity
public class Category {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String icon;
    private int span;
    private  int sortOrder;

    public Category(String name, String icon, int sortOrder,int span) {
        this.name = name;
        this.icon = icon;
        this.sortOrder = sortOrder;
        this.span=span;
    }
}
