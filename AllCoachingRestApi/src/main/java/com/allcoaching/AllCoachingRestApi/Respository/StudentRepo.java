package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import org.springframework.data.domain.Page;
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
public interface StudentRepo extends PagingAndSortingRepository<Student,Long> {


    Optional<Student> findByMobileNumber(String mobileNumber);
    Page<Student> findByBlocked(boolean status, Pageable pageable);

    @Modifying
    @Query("UPDATE Student set studentImage=:image where id=:id")
    void updateProfilePic(String image,long id);


    @Modifying
    @Query("UPDATE Student set blocked=:status where id=:id")
    void updateBlockedStatus(boolean status,long id);

    @Modifying
    @Query("UPDATE Student set expoToken=:token where id=:id")
    void updatePushToken(long id,String token);



    @Query("Select DISTINCT s.expoToken from Student s , Institute i , InsReview ir where ir.insId=i.id and i.category=:categoryId and ir.studentId=s.id and s.expoToken is not null")
    List<String> getExpoTokenOfStudentsEnrolledInCategory(long categoryId);

    @Query("Select expoToken from Student where id =:studentId or email =:email and expoToken is not null")
    String getExpoTokenOfStudent(long studentId,String email);

    @Query("Select expoToken from Student where  expoToken is not null")
    Page<String> getExpoTokenOfAllStudents(Pageable pageable);

    Page<Student> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Student> findByEmailContainingIgnoreCase(String email,Pageable pageable);
}
