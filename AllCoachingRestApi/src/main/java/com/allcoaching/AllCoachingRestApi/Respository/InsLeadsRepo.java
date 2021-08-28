package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsLeads;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface InsLeadsRepo extends PagingAndSortingRepository<InsLeads,Long> {


    Optional<InsLeads> findByCourseIdAndInsIdAndUserId(long courseId,long insId,long userId);
    long countByInsId(long insId);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto(c.id,c.title,c.leads) from Course c , InsLeads il where c.id = il.courseId and il.insId=:id")
    Page<InsLeadsDto> findAllByInsId(long id, Pageable pageable);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto(s.id,s.name,s.studentImage,s.userId) from Student s , InsLeads il where s.id = il.userId and il.courseId=:id")
    Page<InsLeadsStudentDto> findAllByCourseId(long id,Pageable pageable);


}
