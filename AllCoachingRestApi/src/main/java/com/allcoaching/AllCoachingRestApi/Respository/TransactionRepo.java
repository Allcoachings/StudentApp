package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepo extends PagingAndSortingRepository<Transaction,Long> {

    Page<Transaction> findByCourseId(long courseId, Pageable pageable);
    Page<Transaction> findByInsId(long insId, Pageable pageable);
    Page<Transaction> findByStudentId(long studentId, Pageable pageable);
    Page<Transaction> findByStatus(String status, Pageable pageable);



}
