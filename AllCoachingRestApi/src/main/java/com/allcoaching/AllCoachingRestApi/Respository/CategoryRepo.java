package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo  extends CrudRepository<Category,Long> {

    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.CategoryDropDownDto(c.id,c.name)  from Category c")
    Iterable<CategoryDropDownDto> findByAllForDropdown();

}
