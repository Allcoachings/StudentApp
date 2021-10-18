package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CkEditorFileUploadDto {


    private String url;
    private  boolean uploaded;
}
