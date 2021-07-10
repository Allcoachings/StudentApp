package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@ToString
@NoArgsConstructor
@Entity
public class DocumentPlaylist {

    @Id
    @GeneratedValue
     private  long id;

     private String name;
     private long courseId;
//     @OneToMany(targetEntity = CourseDocument.class)
//     @JoinColumn(name="playlistId",referencedColumnName = "id")
//    private List<CourseDocument> courseDocuments;


    public DocumentPlaylist(String name, long courseId) {
        this.name = name;
        this.courseId = courseId;
    }
}
