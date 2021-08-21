package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class InsAccountDto {

    private long insId;
    private String accountNumber;
    private String ifsc;
    private String accountHolderName;
    private String bankName;



}
