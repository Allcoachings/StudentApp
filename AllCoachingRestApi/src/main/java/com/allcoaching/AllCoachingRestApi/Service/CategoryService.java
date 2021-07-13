package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Respository.CategoryRepo;
import com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;




    //saving category to repo
    public Category save(Category category)
    {
        return categoryRepo.save(category);
    }

    //fetching all categories from repo
    public Iterable<Category> findAll()
    {

        Page<Category> pagedResult =categoryRepo.findAll(PageRequest.of(0,200, Sort.by("sortOrder")));
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Category>();
        }

    }

    //fetching single category from repo using id
    public Optional<Category> findById(long id)
    {
        return categoryRepo.findById(id);
    }

    //fetching all for dropdown mode as label and value pair
    public  Iterable<CategoryDropDownDto> findByAllForDropdown()
    {
        return categoryRepo.findByAllForDropdown();
    }


}
