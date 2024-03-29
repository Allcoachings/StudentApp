package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.dto.TransactionDto;
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
public interface TransactionRepo extends PagingAndSortingRepository<Transaction,Long> {
    @Query("SELECT new com.allcoaching.AllCoachingRestApi.dto.TransactionStudentDetailDto(t,s) from Transaction t,Student s where t.studentId=s.id and t.courseId=:courseId and t.status='TXN_SUCCESS'")
    Page<Transaction> findByCourseIdWithStudentDetailSuccess(long courseId, Pageable pageable);


    Page<Transaction> findByCourseId(long courseId, Pageable pageable);
    Page<Transaction> findByStudentId(long studentId, Pageable pageable);
    Page<Transaction> findByStatus(String status, Pageable pageable);
    Optional<Transaction> findByOrderId(String orderId);
    long countByIsSeenByAdminAndStatus(boolean isSeenByAdmin,String status);
    long countByInsIdAndIsSeenByInsAndStatus(long insId,boolean isSeenByIns,String status);


    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id")
    Page<TransactionDto> findAllTransactions(Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id and s.name like %:name%")
    Page<TransactionDto> findAllTransactionsByStudentName(String name,Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id and t.insId=:insId")
    Page<TransactionDto> findByInsId(long insId, Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id and t.status=:status")
    Page<TransactionDto> findAllTransactionsByStatus(String status,Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id and t.insId=:insId and t.status=:status")
    Page<TransactionDto> findByInsIdAnsStatus(long insId,String status, Pageable pageable);

    @Modifying
    @Query("UPDATE Transaction set status=:status,gatewayTransactionId=:gatewayTransactionId,gatewayResponseMsg=:gatewayResponseMsg where orderId=:orderId")
    void completeTransaction(String status,String gatewayTransactionId,String gatewayResponseMsg,String orderId);

    @Modifying
    @Query("UPDATE Transaction t set t.isSeenByAdmin = :status where t.id=:id")
    void updateTransactionStatus(long id,boolean status);

    @Modifying
    @Query("UPDATE Transaction t set t.isSeenByIns = :status where t.id=:id")
    void updateTransactionStatusForIns(long id,boolean status);

    @Query("Select COALESCE(sum(CAST(t.amount AS float)),0)  from Transaction t where t.purchaseDate>=CURRENT_DATE and insId=?1 and status='TXN_SUCCESS'")
    long todayIncomeSumIns(long insId);

    @Query("Select COALESCE(sum(CAST(t.amount AS float)),0)  from Transaction t where month(t.purchaseDate)=month(CURRENT_DATE) and  insId=?1 and status='TXN_SUCCESS'")
    long currentMonthIncomeSumIns(long insId);

    @Query("Select COALESCE(sum(CAST(t.amount AS float)),0)  from Transaction t where  insId=?1 and status='TXN_SUCCESS'")
    long totalIncomeSumIns(long insId);

}
