package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TransactionStudentDetailDto {

    private Transaction transaction;
    private Student student;
}
