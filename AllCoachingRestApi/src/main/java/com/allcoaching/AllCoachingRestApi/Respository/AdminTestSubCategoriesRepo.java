package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.AdminTestSubCategories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminTestSubCategoriesRepo  extends CrudRepository<AdminTestSubCategories,Long> {

    Iterable<AdminTestSubCategories> findByCategoryId(long id);
    Page<AdminTestSubCategories> findByNameContaining(String name, Pageable pageable);
}
