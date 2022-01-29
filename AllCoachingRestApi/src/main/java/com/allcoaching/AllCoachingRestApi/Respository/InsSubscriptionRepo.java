package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.InsSubscription;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface InsSubscriptionRepo extends PagingAndSortingRepository<InsSubscription,Long> {


   @Query("Select i from Institute i , InsSubscription s where s.insId=i.id and s.studentId=:id")
  Page<Institute> findStudentSubscriptionList(long id, Pageable pageable);

   @Query("Select stu from Student stu , InsSubscription s where s.studentId=stu.id and s.insId=:id")
  Page<Student> findInsSubscriptionList(long id, Pageable pageable);

   @Modifying
    @Query("UPDATE Institute set followersCount = followersCount+1 where id=:id")
    void increaseInstituteFollowers(long id);

   @Modifying
    @Query("UPDATE InsSubscription set isNotificationOn =:status where studentId=:studentId and insId=:insId")
    void updateIsNotificationsOn(long studentId,long insId,boolean status);


   @Modifying
   @Query("UPDATE Institute set followersCount = followersCount-1 where id=:id")
    void decreaseInstituteFollowers(long id);

   void deleteByStudentIdAndInsId(long studentId,long insId);

   Optional<InsSubscription> findByStudentIdAndInsId(long studentId,long insId);


}
