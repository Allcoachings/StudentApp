package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.*;
import com.allcoaching.AllCoachingRestApi.Respository.*;
import com.allcoaching.AllCoachingRestApi.dto.FeedContentDto;
import com.allcoaching.AllCoachingRestApi.dto.FeedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class FeedService {

    @Autowired
    private FeedRepo feedRepo;

    @Autowired
    private InstituteRepo instituteRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private FeedPollOptionsRepo pollOptionsRepo;

    @Autowired
    private FeedImageRepo feedImageRepo;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private InsSubscriptionService insSubscriptionService;

    public FeedDto getById(long id)
    {
        //fetching data from repo pagination implemented
        Optional<Feed> opFeed = feedRepo.findById(id);
        if(opFeed.isPresent())
        {



                Feed f = opFeed.get();
                FeedContentDto feedContentDto = new FeedContentDto(f);
                FeedDto feedDto = new FeedDto(feedContentDto);

                    //detecting poster type is it a institute or a student
                    switch (f.getPostedBy())
                    {
                        case 1: //it is a institute
                            feedDto.setPosterObject( instituteRepo.findById(f.getInsId()));
                            break;
                        case 2://it is a student
                            feedDto.setPosterObject( studentRepo.findById(f.getStudentId()));
                            break;
                    }
                    //checking if it is a poll feed
                    if(f.getFeedType()==2)
                    {
                        //if yes then fetching poll options for that feed
                        feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(f.getId()));

                    }

                    //checking if it is a image feed
                    if(f.getFeedType()==1)
                    {

                        feedContentDto.setFeedImages(feedImageRepo.findByFeedId(f.getId()));

                    }
                return feedDto;

        }
        //created list for returing multiple FeedDtos
        return  new FeedDto();

    }
    //saving feed to repo
    public Feed saveFeed(FeedContentDto feedContentDto)
    {
        Feed feed = feedContentDto.getFeed();
        Feed feed_saved = feedRepo.save(feed);
        if(feed.getId()!=0&&feed.getPostedBy()==1)
        {
            sendNotificationAsync(feed.getInsId(),feed.getDescription());
        }
        if(feed.getFeedType()==2)
        {
            Iterable<FeedPollOptions> feedPollOptions = feedContentDto.getFeedPollOptions();
            feedPollOptions.forEach(item->item.setFeedId(feed_saved.getId()));
            pollOptionsRepo.saveAll(feedPollOptions);
        }
        if(feed.getFeedType()==1)
        {
            Iterable<FeedImages> feedImages = feedContentDto.getFeedImages();
            feedImages.forEach(item->item.setFeedId(feed_saved.getId()));
            System.out.println("feed Images "+feedImages);
            feedImageRepo.deleteByFeedId(feed_saved.getId());
            feedImageRepo.saveAll(feedImages);
        }
        return feed_saved;
    }

    //fetching All Feed items
    public Iterable<FeedDto> getAllFeed(int page, int pageSize)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findAll(PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"creationTime")));

        //created list for returing multiple FeedDtos
        List<FeedDto> feedDtos = new ArrayList<>();

        if(pagedFeeds.hasContent())
        {
            pagedFeeds.forEach(item->{
                FeedContentDto feedContentDto = new FeedContentDto(item);
                FeedDto feedDto = new FeedDto(feedContentDto);

                //detecting poster type is it a institute or a student
                switch (item.getPostedBy())
                {
                    case 1: //it is a institute
                        feedDto.setPosterObject( instituteRepo.findById(item.getInsId()));
                        break;
                    case 2://it is a student
                        feedDto.setPosterObject( studentRepo.findById(item.getStudentId()));
                        break;
                }
                //checking if it is a poll feed
                if(item.getFeedType()==2)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(item.getId()));

                }

                //checking if it is a image feed
                if(item.getFeedType()==1)
                {

                    feedContentDto.setFeedImages(feedImageRepo.findByFeedId(item.getId()));

                }
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }

    //fetching All Feed items of institute
    public Iterable<FeedDto> getAllFeedIns(int page, int pageSize,long insId)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findByInsId(insId,PageRequest.of(page,pageSize,   Sort.by(Sort.Direction.DESC,"creationTime")));

        //created list for returing multiple FeedDtos
        List<FeedDto> feedDtos = new ArrayList<>();

        if(pagedFeeds.hasContent())
        {
            pagedFeeds.forEach(item->{


                FeedContentDto feedContentDto = new FeedContentDto(item);
                FeedDto feedDto = new FeedDto(feedContentDto);

                //detecting poster type is it a institute or a student
                switch (item.getPostedBy())
                {
                    case 1: //it is a institute
                        feedDto.setPosterObject( instituteRepo.findById(item.getInsId()));
                        break;
                    case 2://it is a student
                        feedDto.setPosterObject( studentRepo.findById(item.getStudentId()));
                        break;
                }
                //checking if it is a poll feed
                if(item.getFeedType()==2)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(item.getId()));

                }

                //checking if it is a image feed
                if(item.getFeedType()==1)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedImages(feedImageRepo.findByFeedId(item.getId()));

                }
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }
    //fetching All Feed items of student
    public Iterable<FeedDto> getAllFeedStudent(int page, int pageSize,long stuId)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findByStudentId(stuId,PageRequest.of(page,pageSize,   Sort.by(Sort.Direction.DESC,"creationTime")));

        //created list for returing multiple FeedDtos
        List<FeedDto> feedDtos = new ArrayList<>();

        if(pagedFeeds.hasContent())
        {
            pagedFeeds.forEach(item->{


                FeedContentDto feedContentDto = new FeedContentDto(item);
                FeedDto feedDto = new FeedDto(feedContentDto);

                //detecting poster type is it a institute or a student
                switch (item.getPostedBy())
                {
                    case 1: //it is a institute
                        feedDto.setPosterObject( instituteRepo.findById(item.getInsId()));
                        break;
                    case 2://it is a student
                        feedDto.setPosterObject( studentRepo.findById(item.getStudentId()));
                        break;
                }
                //checking if it is a poll feed
                if(item.getFeedType()==2)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(item.getId()));

                }

                //checking if it is a image feed
                if(item.getFeedType()==1)
                {

                    feedContentDto.setFeedImages(feedImageRepo.findByFeedId(item.getId()));

                }
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }
    //fetching All Feed items of having a particular tag
    public Iterable<FeedDto> getAllFeedByTagContaining(int page, int pageSize,String tags)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findByTagsContaining(tags,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"creationTime")));

        //created list for returing multiple FeedDtos
        List<FeedDto> feedDtos = new ArrayList<>();

        if(pagedFeeds.hasContent())
        {
            pagedFeeds.forEach(item->{


                FeedContentDto feedContentDto = new FeedContentDto(item);
                FeedDto feedDto = new FeedDto(feedContentDto);

                //detecting poster type is it a institute or a student
                switch (item.getPostedBy())
                {
                    case 1: //it is a institute
                        feedDto.setPosterObject( instituteRepo.findById(item.getInsId()));
                        break;
                    case 2://it is a student
                        feedDto.setPosterObject( studentRepo.findById(item.getStudentId()));
                        break;
                }
                //checking if it is a poll feed
                if(item.getFeedType()==2)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(item.getId()));

                }

                //checking if it is a image feed
                if(item.getFeedType()==1)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedImages(feedImageRepo.findByFeedId(item.getId()));

                }
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }
    //fetching All Feed items of having a particular tag
    public Iterable<FeedDto> getAllFeedByCatContaining(int page, int pageSize,long cat)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findByCategoryId(cat,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"creationTime")));

        //created list for returing multiple FeedDtos
        List<FeedDto> feedDtos = new ArrayList<>();

        if(pagedFeeds.hasContent())
        {
            pagedFeeds.forEach(item->{


                FeedContentDto feedContentDto = new FeedContentDto(item);
                FeedDto feedDto = new FeedDto(feedContentDto);

                //detecting poster type is it a institute or a student
                switch (item.getPostedBy())
                {
                    case 1: //it is a institute
                        feedDto.setPosterObject( instituteRepo.findById(item.getInsId()));
                        break;
                    case 2://it is a student
                        feedDto.setPosterObject( studentRepo.findById(item.getStudentId()));
                        break;
                }
                //checking if it is a poll feed
                if(item.getFeedType()==2)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedPollOptions(pollOptionsRepo.findByFeedId(item.getId()));
                }

                //checking if it is a image feed
                if(item.getFeedType()==1)
                {
                    //if yes then fetching poll options for that feed
                    feedContentDto.setFeedImages(feedImageRepo.findByFeedId(item.getId()));

                }
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }

    public Iterable<Notification> sendNotificationToEnrolledStudents(long insId, String message)
    {
        Institute institute = instituteRepo.findById(insId).get();

        return notificationService.insertNotification(insSubscriptionService.getInsFollowerStudentIds(insId),institute.getName()+" shared a post "+message+" in Community ",institute.getId(),"institute","general",institute);
    }
    @Async
    public CompletableFuture<Iterable<Notification>> sendNotificationAsync(long insId, String message)
    {
        return CompletableFuture.completedFuture(sendNotificationToEnrolledStudents(insId,message));
    }

    //like feed
    public  void likeFeed(long id,int likerType,long likerId)
    {
        if(likerType==1)
        {
            feedRepo.likeFeedIns(id,likerId);
        }else
        {
            feedRepo.likeFeedStu(id,likerId);
        }
    }

    //vote poll feed
    public  void votePoll(long id,int voterType,long voterId,long optionId)
    {
        pollOptionsRepo.pollOptionUpVote(optionId);
        if(voterType==1)
        {
            feedRepo.pollVoteIns(id,voterId);
        }else
        {
            feedRepo.pollVoteStudent(id,voterId);
        }
    }
    //unlike feed long id

    public  void unlikeFeed(long id,int type,long likerId)
    {
        if(type==1)
        {
            feedRepo.unlikeFeedIns(id,likerId);

        }else
        {
            feedRepo.unlikeFeedStu(id,likerId);

        }
    }

    public void deleteFeedById(long id)
    {
        feedRepo.deleteById(id);
    }

}
