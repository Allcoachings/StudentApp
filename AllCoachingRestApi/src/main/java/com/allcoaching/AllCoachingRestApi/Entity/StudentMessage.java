package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@ToString
@NoArgsConstructor
@Entity
public class StudentMessage {
    @GeneratedValue
    @Id
    private long id;

    private String message;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date messageInitialTime;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date messageUpdateTime;

    @OneToOne(targetEntity = Student.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="studentId",referencedColumnName = "id")
    private Student student;

    @OneToOne(targetEntity = Institute.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="instituteId",referencedColumnName = "id")
    private Institute institute;
    //if this message is sent by student to an institute
    // then courseId will be used to store course of the institute in which
    // student has enrolled
    private long courseId;

    //will be true if message is sent to  admin by student
    private boolean forAdmin;


    //to toggle between seen or unseen by admin only those which are there for admin
    private boolean isSeenByAdmin=false;


    //feedback , instituteCourseRelated, helpAndSupport
    private String messageType;

    @OneToMany(targetEntity = StudentMessageImages.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="studentMsg_fk",referencedColumnName = "id")
    private List<StudentMessageImages> images= new ArrayList<>();



}
