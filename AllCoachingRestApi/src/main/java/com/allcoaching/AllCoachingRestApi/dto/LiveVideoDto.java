package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.CourseVideo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LiveVideoDto {
    private String liveClassDate;
    private String liveClassTime;
    private String name;
    private String description;
    private String videoLocation;
    private long courseId;
    private long id;
    private boolean isDemo;

    private MultipartFile thumbnail;
}
