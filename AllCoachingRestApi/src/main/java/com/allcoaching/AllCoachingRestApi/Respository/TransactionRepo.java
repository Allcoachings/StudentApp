package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
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

    Page<Transaction> findByCourseId(long courseId, Pageable pageable);
    Page<Transaction> findByInsId(long insId, Pageable pageable);
    Page<Transaction> findByStudentId(long studentId, Pageable pageable);
    Page<Transaction> findByStatus(String status, Pageable pageable);
    Optional<Transaction> findByOrderId(String orderId);


    @Modifying
    @Query("UPDATE Transaction set status=:status,gatewayTransactionId=:gatewayTransactionId,gatewayResponseMsg=:gatewayResponseMsg where orderId=:orderId")
    void completeTransaction(String status,String gatewayTransactionId,String gatewayResponseMsg,String orderId);


}
