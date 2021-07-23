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
public class StudentHistory {

    @Id
    @GeneratedValue
    private long id;
    private String type;
    private  long itemId;
    private long studentId;

    public StudentHistory(String type, long itemId, long studentId) {
        this.type = type;
        this.itemId = itemId;
        this.studentId = studentId;
    }
}
