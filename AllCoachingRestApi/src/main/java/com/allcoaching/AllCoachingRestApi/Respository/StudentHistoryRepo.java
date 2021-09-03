package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.StudentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryRepo extends PagingAndSortingRepository<StudentHistory,Long> {


    Page<StudentHistory> findByStudentIdAndType(long studentId,String type,Pageable pageable);
}
