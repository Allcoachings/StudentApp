package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface InstituteRepo extends PagingAndSortingRepository<Institute,Long> {




    Page<Institute> findByCategory(long id, Pageable page);
    Page<Institute> findByCategoryAndStatus(long id,int status,Pageable pageable);
    @Query("SELECT expoToken from Institute where category=:id and expoToken is not null")
    Page<String> findByCategoryAndExpoTokenNotNull(long id, Pageable page);
    Page<Institute> findByStatus(int status, Pageable page);
    Page<Institute> findByStatusAndCategory(int status,long category, Pageable page);
    Optional<Institute> findByEmail(String email);

    Optional<Institute> findByEmailAndPassword(String email,String Password);
    @Modifying
    @Query("UPDATE Institute set leads=leads+1 where id=:id")
    void updateInstituteLeads(long id);

    @Modifying
    @Query("UPDATE Institute set totalRevenue=totalRevenue+:amount where id=:id")
    void updateInstituteRevenue(long amount,long id);

    @Modifying
    @Query("UPDATE Institute set insStreamingSecretKey=:insStreamingSecretKey where id=:id")
    void updateInstituteStreamingKey(String insStreamingSecretKey,long id);

    Page<Institute> findByNameContainingIgnoreCase(String name,Pageable pageable);
    Page<Institute> findByEmailContainingIgnoreCase(String email,Pageable pageable);

    @Modifying
    @Query("UPDATE Institute set status=:status where id=:id")
    void updateStatus(int status,long id);

    @Modifying
    @Query("UPDATE Institute set boostValue=:value where id=:id")
    void boostIns(long id,int value);

    @Modifying
    @Query("UPDATE Institute set accountNumber=:accountNumber,ifsc=:ifsc,accountHolderName=:accountHolderName,bankName=:bankName,upi=:upi where id=:id")
    void updateInstituteAccountDetails(String accountNumber,String ifsc,String accountHolderName,String bankName,String upi,long id);

    @Modifying
    @Query("UPDATE Institute set expoToken=:token where id=:id")
    void updatePushToken(long id,String token);

    @Modifying
    @Query("UPDATE Institute set fiveStarCount=fiveStarCount+1 where id=:id ")
    int increaseFiveStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set fiveStarCount=fiveStarCount-1 where id=:id ")
    int decreaseFiveStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set fourStarCount=fourStarCount+1 where id=:id ")
    int increaseFourStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set fourStarCount=fourStarCount-1 where id=:id ")
    int decreaseFourStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set threeStarCount=threeStarCount+1 where id=:id ")
    int increaseThreeStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set threeStarCount=threeStarCount-1 where id=:id ")
    int decreaseThreeStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set twoStarCount=twoStarCount+1 where id=:id ")
    int increaseTwoStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set twoStarCount=twoStarCount-1 where id=:id ")
    int decreaseTwoStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set oneStarCount=oneStarCount+1 where id=:id ")
    int increaseOneStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set oneStarCount=oneStarCount-1 where id=:id ")
    int decreaseOneStarCount(long id);

    @Modifying
    @Query("UPDATE Institute set totalRatingCount=totalRatingCount+1 where id=:id ")
    int increaseTotalRatingCount(long id);

    @Modifying
    @Query("UPDATE Institute set totalRatingCount=totalRatingCount-1 where id=:id ")
    int decreaseTotalRatingCount(long id);

    @Modifying
    @Query("UPDATE Institute set totalRating=totalRating+:rating where id=:id ")
    int increaseTotalRating(long id,int rating);

    @Modifying
    @Query("UPDATE Institute set totalRating=totalRating-:rating where id=:id ")
    int decreaseTotalRating(long id,int rating);


    @Query("Select DISTINCT i.expoToken from  Institute i where  i.category=:categoryId  and i.expoToken is not null")
    List<String> getExpoTokenOfInsEnrolledInCategory(long categoryId);

    @Query("Select expoToken from Institute  where id =:insId or email=:email and expoToken is not null")
    String getExpoTokenOfIns(long insId,String email);

    @Query("Select expoToken from Institute where expoToken is not null")
    Page<String> getExpoTokenOfAllIns(Pageable pageable);

}
