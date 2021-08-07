package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface MainBannersRepo extends PagingAndSortingRepository<MainBanners,Long> {


    @Override
    Page<MainBanners> findAll(Pageable pageable);


    @Modifying
    @Query("UPDATE MainBanners set bannerLink=:bannerLink,placeholder=:placeholder where id=:id")
    MainBanners updateBannerDetails(String bannerLink,String placeholder,long id);

    @Modifying
    @Query("UPDATE MainBanners set bannerImageLink=:imageLink where id=:id")
    void updateBannerImage(String imageLink,long id);
}
