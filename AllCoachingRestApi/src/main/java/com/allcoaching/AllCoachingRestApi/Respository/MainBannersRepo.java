package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.MainBanners;
import jdk.tools.jmod.Main;
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

    Iterable<MainBanners> findByPlaceHolder(String placeHolder);
    @Modifying
    @Query("UPDATE MainBanners set bannerLink=:bannerLink,placeHolder=:placeholder where id=:id")
    void updateBannerDetails(String bannerLink,String placeholder,long id);

    @Modifying
    @Query("UPDATE MainBanners set bannerImageLink=:imageLink where id=:id")
    void updateBannerImage(String imageLink,long id);
}
