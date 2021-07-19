package com.allcoaching.AllCoachingRestApi.Respository;


import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface FeedRepo extends PagingAndSortingRepository<Feed,Long> {

    Page<Feed> findByStudentId(long studentId,Pageable page);
    Page<Feed> findByInsId(long insId, Pageable page);

    Page<Feed> findByTagsContaining(String tags,Pageable page);

    @Modifying
    @Query("UPDATE Feed set likes=likes+1,feedLikerIns = CONCAT(feedLikerIns,:insId,',') where id=:id")
    void likeFeedIns(long id,long insId);

    @Modifying
    @Query("UPDATE Feed set likes=likes-1 where id=:id")
    void unlikeFeedIns(long id);

    @Modifying
    @Query("UPDATE Feed set likes=likes+1,feedLikerStudent = feedLikerStudent||:studentId||',' where id=:id")
    void likeFeedStu(long id,long studentId);

    @Modifying
    @Query("UPDATE Feed set likes=likes-1 where id=:id")
    void unlikeFeedStu(long id);


    @Modifying
    @Query("UPDATE Feed set totalPollVotes=totalPollVotes+1,pollVotedStudents = pollVotedStudents||:studentId||',' where id=:id")
    void pollVoteStudent(long id,long studentId);

    @Modifying
    @Query("UPDATE Feed set totalPollVotes=totalPollVotes+1,pollVotedInstitutes = CONCAT(pollVotedInstitutes,:insId,',') where id=:id")
    void pollVoteIns(long id,long insId);
}
