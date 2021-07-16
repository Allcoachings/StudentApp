package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@ToString
@Entity
public class Feed {
    @Id
    @GeneratedValue
    private long id;


    private int feedType;//1-imagesPost,2-Poll post,3-text post

    private String photoLocation;
    private String description;

    private String pollQuestion;
    private int totalPollVotes;
    private int voterType;//1-institute,2-student
    private String pollVotedStudents=",";
    private String pollVotedInstitutes=",";

    private int likes;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date time_stamp;

    private int postedBy;//1-institute , 2-student
    private long studentId;
    private long insId;
    private String tags="#all";


    public Feed(int feedType, String photoLocation, String description, String pollQuestion, int totalPollVotes, int voterType, String pollVotedStudents, String pollVotedInstitutes, int likes, Date time_stamp, int postedBy, long studentId, long insId,String tags) {
        this.feedType = feedType;
        this.photoLocation = photoLocation;
        this.description = description;
        this.pollQuestion = pollQuestion;
        this.totalPollVotes = totalPollVotes;
        this.voterType = voterType;
        this.pollVotedStudents =this.pollVotedStudents+""+pollVotedStudents+",";
        this.pollVotedInstitutes =this.pollVotedInstitutes +""+ pollVotedInstitutes+",";
        this.likes = likes;
        this.time_stamp = time_stamp;
        this.postedBy = postedBy;
        this.studentId = studentId;
        this.insId = insId;
        this.tags = this.tags+""+tags;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getFeedType() {
        return feedType;
    }

    public void setFeedType(int feedType) {
        this.feedType = feedType;
    }

    public String getPhotoLocation() {
        return photoLocation;
    }

    public void setPhotoLocation(String photoLocation) {
        this.photoLocation = photoLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPollQuestion() {
        return pollQuestion;
    }

    public void setPollQuestion(String pollQuestion) {
        this.pollQuestion = pollQuestion;
    }

    public int getTotalPollVotes() {
        return totalPollVotes;
    }

    public void setTotalPollVotes(int totalPollVotes) {
        this.totalPollVotes = totalPollVotes;
    }

    public int getVoterType() {
        return voterType;
    }

    public void setVoterType(int voterType) {
        this.voterType = voterType;
    }

    public String getPollVotedStudents() {
        return pollVotedStudents;
    }

    public void setPollVotedStudents(String pollVotedStudents) {
        this.pollVotedStudents = this.pollVotedStudents+""+pollVotedStudents+",";
    }

    public String getPollVotedInstitutes() {
        return pollVotedInstitutes;
    }

    public void setPollVotedInstitutes(String pollVotedInstitutes) {
        this.pollVotedInstitutes = this.pollVotedInstitutes+""+pollVotedInstitutes+",";;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public Date getTime_stamp() {
        return time_stamp;
    }

    public void setTime_stamp(Date time_stamp) {
        this.time_stamp = time_stamp;
    }

    public int getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(int postedBy) {
        this.postedBy = postedBy;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getInsId() {
        return insId;
    }

    public void setInsId(long insId) {
        this.insId = insId;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags =this.tags+""+tags;
    }

    public String getPollVoterList()
    {
        switch (this.voterType)
        {
            case 1:
                return pollVotedInstitutes;
            case 2:
                return pollVotedStudents;
        }
        return ",";
    }
    public void setPollVoterList(int voterType,String list)
    {
        switch (voterType)
        {
            case 1:
               this.pollVotedInstitutes = this.pollVotedInstitutes+""+list+",";
            case 2:
                this.pollVotedStudents = this.pollVotedStudents+""+list+",";
        }
    }

//    public void setPostedBy(long posterId) {
//        switch (this.postedBy)
//        {
//            case 1:
//                this.insId=posterId;
//                break;
//            case 2:
//                this.studentId=posterId;
//                break;
//        }
//    }

//    public long getPostedBy() {
//        if(this.postedBy==1)
//        {
//            return this.insId;
//        }else if(this.postedBy==2)
//        {
//            return  this.studentId;
//        }
//        return 0;
//    }
}