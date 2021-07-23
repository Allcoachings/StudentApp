package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@ToString
@Entity
public class InsLeads {

    @Id
    @GeneratedValue
    private long id;

    private  long insId;
    private long userId;
    private long courseId;

}
