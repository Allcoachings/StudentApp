package com.allcoaching.AllCoachingRestApi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDropDownDto {
    private long key;
    private  String label;

}
