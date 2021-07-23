package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSeriesSubCategoryContentRepo;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSubCategoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminTestSubCategoriesService {


    @Autowired
    private AdminTestSubCategoriesRepo adminTestSubCategoriesRepo;

    @Autowired
    private AdminTestSeriesSubCategoryContentRepo adminTestSeriesSubCategoryContentRepo;

    public AdminTestSubCategories save(AdminTestSubCategories adminTestSubCategories)
    {
        return  adminTestSubCategoriesRepo.save(adminTestSubCategories);
    }

    public Iterable<AdminTestSubCategories> findAllItems()
    {
        return adminTestSubCategoriesRepo.findAll();
    }

    public Iterable<AdminTestSubCategories> findByCategory(long id)
    {
        return adminTestSubCategoriesRepo.findByCategoryId(id);
    }






}
