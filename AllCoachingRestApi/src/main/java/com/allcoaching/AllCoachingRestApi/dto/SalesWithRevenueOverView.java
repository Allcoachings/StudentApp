package com.allcoaching.AllCoachingRestApi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SalesWithRevenueOverView {

    private  Iterable<SalesOverViewDataDto> salesOverViewDataDtos;
    private long total_purchased_course;
    private float total_revenue;
}
