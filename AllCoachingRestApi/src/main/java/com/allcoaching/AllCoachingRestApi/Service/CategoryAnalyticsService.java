package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.dto.CategoryWisePurchaseDataDto;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryAnalyticsService {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private  InsReviewService insReviewService;
    @Autowired InstituteService instituteService;

    //student list category wise
    public  Iterable<CategoryWisePurchaseDataDto> getStudentByCategory(long category, int offset, int pageSize)
    {
        return  insReviewService.findEnrolledStudentsByCategoryId(category,offset,pageSize);
    }

    //student count category wise

    public Iterable<Graph2dDataDto>  studentCountCategoryWise()
    {
        return categoryService.studentCountCategoryWise();
    }
    //student count category wise
    public Iterable<Graph2dDataDto>  insCountCategoryWise()
    {
        return categoryService.insCountCategoryWise();

    }
}
