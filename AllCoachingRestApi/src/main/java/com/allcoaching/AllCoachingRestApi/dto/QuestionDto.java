package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {

    //multiparts
    private MultipartFile questionImage;
    private MultipartFile optionAImage;
    private MultipartFile optionBImage;
    private MultipartFile optionCImage;
    private MultipartFile optionDImage;

    //text
    private String questionText;
    private String optionAText;
    private String optionBText;
    private String optionCText;
    private String optionDText;

    //other details of question
    private String correctOpt;
    private String explanation;
    private int correctMarks;
    private int wrongMarks;
    private int questionType;//1 for question type text,2 image only question,3 text with question,4 image with question
    private int optionType;//1 text option,2 for image options
    private long testSeriesId;

    private long questionId;//question id for updating question
    private String mode;//edit or add
}
