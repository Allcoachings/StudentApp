package com.allcoaching.AllCoachingRestApi.Respository;

import com.allcoaching.AllCoachingRestApi.Entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface NotificationRepo extends PagingAndSortingRepository<Notification,Long> {


    Page<Notification> findByNotificationForAndReceiverIdOrderByNotificationTimeDesc(int notificationFor,long receiverId, Pageable pageable);

    @Modifying
    @Query("UPDATE Notification set isSeen=:isSeen where id=:id")
    void updateNotificationStatus(boolean isSeen,long id);


}

