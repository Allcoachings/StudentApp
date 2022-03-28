package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CourseRepo extends CrudRepository<Course,Long> {

    long countByInstIdAndIsDeleted(long instId,boolean isDeleted);
    Iterable<Course> findByInstIdAndIsDeletedOrderByCreatedAtDesc(long id,boolean isDeleted);

    @Modifying
    @Query("UPDATE Course set leads=leads+1 where id=:id")
    void updateCourseLeads(long id);

    @Modifying
    @Query("UPDATE Course set isDeleted=:status where id=:id")
    void updateCourseIsDeletedStatus(long id,boolean status);

    @Query("Select DISTINCT s.expoToken from Student s , InsReview ir where ir.courseId=:courseId and ir.studentId=s.id and s.expoToken is not null")
    List<String> getExpoTokenOfStudentsEnrolledInCourse(long courseId);

    @Query("Select DISTINCT s.id from Student s , InsReview ir where ir.courseId=:courseId and ir.studentId=s.id and s.expoToken is not null")
    List<Long> getCourseEnrolledStudent(long courseId);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto( s.name,s.email,s. mobileNumber,c.title) from Student s , InsReview ir,Course c where ir.courseId= c.id and   ir.insId=:insId and ir.studentId=s.id")
    List<InstituteCourseWiseStudentEnrolledDto> getInstituteCourseWiseStudentEnrolled(long insId);

    @Query("Select new com.allcoaching.AllCoachingRestApi.dto.InstituteCourseWiseStudentEnrolledDto( s.name,s.email,s. mobileNumber,c.title) from Student s , InsReview ir,Course c where ir.courseId= c.id and   ir.courseId=:courseId and ir.studentId=s.id")
    List<InstituteCourseWiseStudentEnrolledDto> getStudentEnrolledInCourse(long courseId);

    @Query("Select Count(DISTINCT ir.studentId) from   InsReview ir where ir.courseId=:courseId")
    long countStudentsEnrolled(long courseId);

    @Query("Select DISTINCT i from Institute i,Course c where i.id=c.instId")
    Institute findInstitueByCourseid(long courseId);


}
