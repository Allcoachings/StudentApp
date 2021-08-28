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
