package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSeriesCategory;
import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import com.allcoaching.AllCoachingRestApi.Respository.AdminTestSeriesCategoryRepo;
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
public class AdminTestSeriesCategoryService {

    @Autowired
    private AdminTestSeriesCategoryRepo adminTestSeriesCategoryRepo;

    @Autowired
    private AdminTestSubCategoriesRepo testSubCategoriesRepo;

    public AdminTestSeriesCategory save(AdminTestSeriesCategory adminTestSeriesCategory)
    {
        return adminTestSeriesCategoryRepo.save(adminTestSeriesCategory);
    }

    public  Iterable<AdminTestCategoriesDto> AdminTestSeriesData(int page,int pageSize)
    {
                Iterable<AdminTestSeriesCategory> adminTestSeriesCategories = adminTestSeriesCategoryRepo.findAll(PageRequest.of(page,pageSize));
                List<AdminTestCategoriesDto> adminTestCategoriesDtos = new ArrayList<>();
                adminTestSeriesCategories.forEach(item->{
                    Iterable<AdminTestSubCategories> adminTestSubCategories = testSubCategoriesRepo.findByCategoryId(item.getId());
                    adminTestCategoriesDtos.add(new AdminTestCategoriesDto(item.getId(),item.getName(),adminTestSubCategories,item.getSortOrder(),item.getImage()));
                });
                return adminTestCategoriesDtos;

    }



    public  Iterable<AdminTestCategoriesDto> searchTestCategoryData(String word,int page,int pageSize)
    {
                Page<AdminTestSeriesCategory> pagedResult = adminTestSeriesCategoryRepo.searchTestCategoryData(word,PageRequest.of(page,pageSize));
                if(pagedResult.hasContent()) {
                    Iterable<AdminTestSeriesCategory> adminTestSeriesCategories = pagedResult.getContent();
                    List<AdminTestCategoriesDto> adminTestCategoriesDtos = new ArrayList<>();
                    adminTestSeriesCategories.forEach(item -> {
                        Iterable<AdminTestSubCategories> adminTestSubCategories = testSubCategoriesRepo.findByCategoryId(item.getId());
                        adminTestCategoriesDtos.add(new AdminTestCategoriesDto(item.getId(), item.getName(), adminTestSubCategories,item.getSortOrder(),item.getImage()));
                    });
                    return adminTestCategoriesDtos;
                }else
                {
                    return  new ArrayList<>();
                }


    }

    public Optional<AdminTestSeriesCategory> findById(long id)
    {
        return adminTestSeriesCategoryRepo.findById(id);
    }

    public void delete(long id)
    {
        adminTestSeriesCategoryRepo.deleteById(id);
    }

}
