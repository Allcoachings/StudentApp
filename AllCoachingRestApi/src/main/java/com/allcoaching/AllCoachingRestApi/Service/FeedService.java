package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Feed;
import com.allcoaching.AllCoachingRestApi.Entity.FeedPollOptions;
import com.allcoaching.AllCoachingRestApi.Respository.FeedPollOptionsRepo;
import com.allcoaching.AllCoachingRestApi.Respository.FeedRepo;
import com.allcoaching.AllCoachingRestApi.Respository.InstituteRepo;
import com.allcoaching.AllCoachingRestApi.Respository.StudentRepo;
import com.allcoaching.AllCoachingRestApi.dto.FeedContentDto;
import com.allcoaching.AllCoachingRestApi.dto.FeedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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



    //saving feed to repo
    public Feed saveFeed(FeedContentDto feedContentDto)
    {
        Feed feed = feedContentDto.getFeed();
        Feed feed_saved = feedRepo.save(feed);
        if(feed.getFeedType()==2)
        {
            Iterable<FeedPollOptions> feedPollOptions = feedContentDto.getFeedPollOptions();
            feedPollOptions.forEach(item->item.setFeedId(feed_saved.getId()));
            pollOptionsRepo.saveAll(feedPollOptions);
        }
        return feed_saved;
    }

    //fetching All Feed items
    public Iterable<FeedDto> getAllFeed(int page, int pageSize)
    {

        //fetching data from repo pagination implemented
        Page<Feed> pagedFeeds = feedRepo.findAll(PageRequest.of(page,pageSize));

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
        Page<Feed> pagedFeeds = feedRepo.findByInsId(insId,PageRequest.of(page,pageSize));

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
                //adding to list of feeddtos
                feedDtos.add(feedDto);
            });

            return feedDtos;
        }else
        {
                    return new ArrayList<FeedDto>();
        }
    }



}
