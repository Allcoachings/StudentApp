package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CategoryRepo  extends PagingAndSortingRepository<Category,Long> {

    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto(c.id,c.name)  from Category c")
    Iterable<CategoryDropDownDto> findByAllForDropdown();

    @Override
    Page<Category> findAll(Pageable p);

    @Query(name = "studentCountCategoryWise", nativeQuery = true)
    Iterable<Graph2dDataDto>  studentCountCategoryWise ();
    @Query(name = "InsCountCategoryWise", nativeQuery = true)
    Iterable<Graph2dDataDto>  insCountCategoryWise ();

}
