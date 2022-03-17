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
    private CourseVideo courseVideo;
    private MultipartFile thumbnail;
}
