package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EditQuestionDto {

    private String type;//file or text
    private int fieldDbType;//type of question or type of option which refers to the database field type value
    private MultipartFile file;
    private String text;
    private String fieldName;
    private long questionId;
}
