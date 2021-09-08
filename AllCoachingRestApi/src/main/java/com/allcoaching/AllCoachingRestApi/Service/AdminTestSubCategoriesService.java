package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesSubCategoryContent;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSeriesSubCategoryContentRepo;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSubCategoriesRepo;
import com.allcoaching.AllCoachingRestApi.dto.AdminTestCategoriesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminTestSubCategoriesService {


    @Autowired
    private AdminTestSubCategoriesRepo adminTestSubCategoriesRepo;

    @Autowired
    private AdminTestSeriesSubCategoryContentRepo adminTestSeriesSubCategoryContentRepo;

    @Autowired
    private AdminTestSeriesCategoryService adminTestSeriesCategoryService;
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



    public Iterable<AdminTestSubCategories> findByCategoryPagedResult(long id,int offset,int pageSize)
    {
        Page<AdminTestSubCategories> adminTestSubCategories = adminTestSubCategoriesRepo.findByCategoryId(id,PageRequest.of(offset,pageSize));
        if(adminTestSubCategories.hasContent())
        {
            return  adminTestSubCategories.getContent();
        }else
        {
            return  new ArrayList<>();
        }
    }

//    public  Iterable<AdminTestCategoriesDto> searchTestCategoryData(String search, int page, int pageSize)
//    {
//        Page<AdminTestSubCategories> adminTestSeriesCategories = adminTestSubCategoriesRepo.findByNameContaining(search, PageRequest.of(page,pageSize));
//        if(adminTestSeriesCategories.hasContent())
//        {
//
//            List<AdminTestCategoriesDto> adminTestCategoriesDtos = new ArrayList<>();
//            adminTestSeriesCategories.getContent().forEach(item -> {
//                Optional<AdminTestSeriesCategory> adminTestCategories = adminTestSeriesCategoryService.findById(item.getId());
//                adminTestCategoriesDtos.add(new AdminTestCategoriesDto(adminTestCategories.get().getId(), adminTestCategories.get().getName(), item));
//            });
//            return adminTestCategoriesDtos;
//        }else
//        {
//            return new ArrayList<>();
//        }
//
//    }


    public  void delete(long id)
    {
        adminTestSubCategoriesRepo.deleteById(id);

    }




}
