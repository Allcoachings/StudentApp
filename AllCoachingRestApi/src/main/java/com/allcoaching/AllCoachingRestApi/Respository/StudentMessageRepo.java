package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.StudentMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface StudentMessageRepo extends PagingAndSortingRepository<StudentMessage,Long> {


    Page<StudentMessage> findByForAdminAndMessageType(boolean forAdmin , String messageType , Pageable pageable);
    Page<StudentMessage> findByForAdmin(boolean forAdmin , Pageable pageable);
//    Page<StudentMessage> findByForAdminAndMessageTypeAndIsSeenByAdmin(boolean forAdmin , String messageType ,boolean isSeenByAdmin, Pageable pageable);
    long countByForAdminAndIsSeenByAdmin(boolean forAdmin,boolean isSeenByAdmin);

    @Modifying
    @Query("UPDATE StudentMessage sm set sm.isSeenByAdmin = :status where sm.id=:id")
    void updateMessageSeenStatus(long id,boolean status);



}
