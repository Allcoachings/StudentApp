package com.allcoaching.AllCoachingRestApi.Service;


import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSubCategoriesRepo;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

    @Autowired
    private InstituteService instituteService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private AdminTestSeriesCategoryService adminTestSeriesCategoryService;

    public Iterable<Institute> searchInstitute(String searchWord,int offset,int dataLimit)
    {
        return instituteService.searchInstitute(searchWord,offset,dataLimit);
    }
    public Iterable<Institute> searchInstituteByEmail(String searchWord,int offset,int dataLimit)
    {
        return instituteService.searchInstituteByEmail(searchWord,offset,dataLimit);
    }

    public Iterable<Student> searchStudent(String searchWord,int offset,int dataLimit)
    {
        return studentService.searchStudent(searchWord,offset,dataLimit);
    }
    public Iterable<Student> searchStudentByEmail(String searchWord,int offset,int dataLimit)
    {
        return  studentService.searchStudentByEmail(searchWord,offset,dataLimit);
    }
    public Iterable<AdminTestCategoriesDto> searchTestSeries(String searchWord, int offset, int dataLimit)
    {
        return adminTestSeriesCategoryService.searchTestCategoryData(searchWord,offset,dataLimit);
    }



}
