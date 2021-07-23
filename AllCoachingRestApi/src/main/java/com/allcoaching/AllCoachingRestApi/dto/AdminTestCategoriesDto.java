package com.allcoaching.AllCoachingRestApi.dto;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminTestCategoriesDto {

    private  long categoryId;
    private  String categoryName;
    private Iterable<AdminTestSubCategories> subCategories;
}
