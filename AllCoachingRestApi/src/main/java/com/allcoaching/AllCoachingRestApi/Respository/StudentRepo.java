package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface StudentRepo extends PagingAndSortingRepository<Student,Long> {


    Optional<Student> findByMobileNumber(String mobileNumber);

    @Modifying
    @Query("UPDATE Student set studentImage=:image where id=:id")
    void updateProfilePic(String image,long id);
}
