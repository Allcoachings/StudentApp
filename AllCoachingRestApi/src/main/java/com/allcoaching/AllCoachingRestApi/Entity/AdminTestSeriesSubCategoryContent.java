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
public class AdminTestSeriesSubCategoryContent {

    @Id
    @GeneratedValue
    private  long id;

    private String name;
    private String image;
    private int sortOrder;
    private long testSeriesSubCategoryId;

    public AdminTestSeriesSubCategoryContent(String name, String image, int sortOrder, long testSeriesSubCategoryId) {
        this.name = name;
        this.image = image;
        this.sortOrder = sortOrder;
        this.testSeriesSubCategoryId = testSeriesSubCategoryId;
    }
}
