package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Entity.StudentPinList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentPinListRepo  extends PagingAndSortingRepository<StudentPinList,Long> {

    Page<StudentPinList> findByStudent(Student student, Pageable pageable);


}
