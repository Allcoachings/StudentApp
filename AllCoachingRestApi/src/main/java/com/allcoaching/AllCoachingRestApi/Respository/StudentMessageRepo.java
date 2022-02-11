package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
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
    Page<StudentMessage> findByForAdminAndMessageTypeAndReplied(boolean forAdmin , String messageType ,boolean replied, Pageable pageable);
    Page<StudentMessage> findByForAdmin(boolean forAdmin , Pageable pageable);
    Page<StudentMessage> findByForAdminAndReplied(boolean forAdmin ,boolean replied, Pageable pageable);
    Page<StudentMessage> findByInstituteAndForAdminAndMessageType(Institute institute,boolean forAdmin , String messageType , Pageable pageable);
    Page<StudentMessage> findByInstituteAndForAdminAndMessageTypeAndReplied(Institute institute,boolean forAdmin , String messageType ,boolean replied, Pageable pageable);
    Page<StudentMessage> findByInstituteAndForAdmin(Institute institute,boolean forAdmin , Pageable pageable);
    Page<StudentMessage> findByInstituteAndForAdminAndReplied(Institute institute,boolean forAdmin ,boolean replied, Pageable pageable);
    Page<StudentMessage> findByInstituteAndCourseIdAndStudentOrderByMessageInitialTime(Institute institute, long courseId, Student student,Pageable pageable);
//    Page<StudentMessage> findByForAdminAndMessageTypeAndIsSeenByAdmin(boolean forAdmin , String messageType ,boolean isSeenByAdmin, Pageable pageable);
    long countByForAdminAndIsSeenByAdmin(boolean forAdmin,boolean isSeenByAdmin);
    long countByInstituteAndIsSeenByIns(Institute institute, boolean isSeenByIns);


    @Query("Select sm from StudentMessage sm where sm.institute=:institute and sm.courseId=:courseId group by sm.student")
    Page<StudentMessage> getChatListForInstitute(Institute institute, long courseId, Pageable pageable);

    @Modifying
    @Query("UPDATE StudentMessage sm set sm.isSeenByAdmin = :status where sm.id=:id")
    void updateMessageSeenStatus(long id,boolean status);

    @Modifying
    @Query("UPDATE StudentMessage sm set sm.isSeenByIns = :status where sm.id=:id")
    void updateMessageSeenByInsStatus(long id,boolean status);



}
