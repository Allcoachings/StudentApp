package com.allcoaching.AllCoachingRestApi.Respository;

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


    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id")
    Page<TransactionDto> findAllTransactions(Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.TransactionDto(t,c,i,s) from Transaction t,Course c,Institute i,Student s where t.courseId=c.id and t.insId=i.id and t.studentId=s.id and t.insId=:insId")
    Page<TransactionDto> findByInsId(long insId, Pageable pageable);
    @Modifying
    @Query("UPDATE Transaction set status=:status,gatewayTransactionId=:gatewayTransactionId,gatewayResponseMsg=:gatewayResponseMsg where orderId=:orderId")
    void completeTransaction(String status,String gatewayTransactionId,String gatewayResponseMsg,String orderId);


}
