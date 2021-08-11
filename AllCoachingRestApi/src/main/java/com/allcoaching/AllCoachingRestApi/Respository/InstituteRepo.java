package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface InstituteRepo extends PagingAndSortingRepository<Institute,Long> {


    Page<Institute> findByCategory(long id, Pageable page);

    Optional<Institute> findByEmailAndPassword(String email,String Password);
    @Modifying
    @Query("UPDATE Institute set leads=leads+1 where id=:id")
    void updateInstituteLeads(long id);

    @Modifying
    @Query("UPDATE Institute set totalRevenue=totalRevenue+:amount where id=:id")
    void updateInstituteRevenue(long amount,long id);

    Page<Institute> findByNameContainingIgnoreCase(String name,Pageable pageable);

    @Modifying
    @Query("UPDATE Institute set status=:status where id=:id")
    void updateStatus(int status,long id);

    @Modifying
    @Query("UPDATE Institute set boostValue=:value where id=:id")
    void boostIns(long id,int value);
}
