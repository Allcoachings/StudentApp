package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.InsSubscription;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.dto.SubscriptionDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface InsSubscriptionRepo extends PagingAndSortingRepository<InsSubscription,Long> {


   @Query(value = "Select new com.allcoaching.AllCoachingRestApi.dto.SubscriptionDto(i, (Select c from Course c where c.createdAt = (select max(c1.createdAt) from Course c1  where  c1.instId=i.id))) from Institute i , InsSubscription s where s.insId=i.id and s.studentId=:id" , countQuery = "Select count(i) from Institute i , InsSubscription s where s.insId=i.id and s.studentId=:id")
  Page<SubscriptionDto> findStudentSubscriptionList(long id, Pageable pageable);

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

   @Query("Select DISTINCT studentId from InsSubscription where insId=:insId")
    List<Long> getInsFollowerStudentIds(long insId);
   Optional<InsSubscription> findByStudentIdAndInsId(long studentId,long insId);


}
