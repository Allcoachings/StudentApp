package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.InsLeads;
import com.allcoaching.AllCoachingRestApi.dto.Graph2dDataDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsDto;
import com.allcoaching.AllCoachingRestApi.dto.InsLeadsStudentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

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

    @Query(name = "insLeadGraphDataYearly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataYearly(@Param("insId") long insId);
    @Query(name = "insLeadGraphDataMonthly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataMontly(@Param("insId") long insId,@Param("dataYear") int dataTime);
    @Query(name = "insLeadGraphDataWeekly", nativeQuery = true)
    Iterable<Graph2dDataDto> getGraphDataWeekly(@Param("insId") long insId,@Param("dataMonth")int dataTime);

     @Query(name = "adminLeadGraphDataYearly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminLeadGraphDataYearly();
    @Query(name = "adminLeadGraphDataMonthly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminLeadGraphDataMonthly(@Param("dataYear") int dataTime);
    @Query(name = "adminLeadGraphDataWeekly", nativeQuery = true)
    Iterable<Graph2dDataDto> adminLeadGraphDataWeekly(@Param("dataMonth")int dataTime);


}
