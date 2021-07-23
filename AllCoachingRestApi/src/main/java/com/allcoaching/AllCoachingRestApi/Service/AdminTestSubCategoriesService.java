package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSubCategoriesRepo;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminTestSubCategoriesService {


    @Autowired
    private AdminTestSubCategoriesRepo adminTestSubCategoriesRepo;


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
