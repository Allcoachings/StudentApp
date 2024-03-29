package com.allcoaching.AllCoachingRestApi.Entity;

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
public class AdminTestSubCategories {

    @Id
    @GeneratedValue
    private long id;

    private  String name;
    private String image;
    private int sortOrder;
    private long categoryId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date addDate;

    public AdminTestSubCategories(String name, String image, int sortOrder, long categoryId) {
        this.name = name;
        this.image = image;
        this.sortOrder = sortOrder;
        this.categoryId = categoryId;
    }
}
