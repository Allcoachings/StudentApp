package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@Entity
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames = {"type", "itemId","studentId"})})
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
