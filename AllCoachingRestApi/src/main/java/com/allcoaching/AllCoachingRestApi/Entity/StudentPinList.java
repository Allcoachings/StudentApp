package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@NoArgsConstructor
@Entity
public class StudentPinList {

    @Id
    @GeneratedValue()
    private long id;
    @OneToOne(targetEntity = Institute.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="ins_id",referencedColumnName = "id")
    private  Institute institute;

    @OneToOne(targetEntity = Student.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="student_id",referencedColumnName = "id")
    private Student student;

}
