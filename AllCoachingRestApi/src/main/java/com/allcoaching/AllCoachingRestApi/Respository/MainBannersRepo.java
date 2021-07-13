package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MainBannersRepo extends PagingAndSortingRepository<MainBanners,Long> {


    @Override
    Page<MainBanners> findAll(Pageable pageable);
}
