package com.allcoaching.AllCoachingRestApi.Entity;

import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class MainBanners {

    @Id
    @GeneratedValue
    private long id;
    private String bannerImageLink;
    private String bannerLink;
    private String placeHolder;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifyDate;

    public MainBanners(String bannerImageLink, String bannerLink,String placeHolder) {
        this.bannerImageLink = bannerImageLink;
        this.bannerLink = bannerLink;
        this.placeHolder = placeHolder;
    }

    public MainBanners() {
    }

    @Override
    public String toString() {
        return "MainBanners{" +
                "id=" + id +
                ", bannerImageLink='" + bannerImageLink + '\'' +
                ", bannerLink='" + bannerLink + '\'' +
                ", placeHolder='" + placeHolder + '\'' +
                ", modifyDate=" + modifyDate +
                '}';
    }

    public MainBanners(String bannerLink, String placeHolder) {
        this.bannerLink = bannerLink;
        this.placeHolder = placeHolder;
    }

    public String getPlaceHolder() {
        return placeHolder;
    }

    public void setPlaceHolder(String placeHolder) {
        this.placeHolder = placeHolder;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBannerImageLink() {
        return bannerImageLink;
    }

    public void setBannerImageLink(String bannerImageLink) {
        this.bannerImageLink = bannerImageLink;
    }

    public String getBannerLink() {
        return bannerLink;
    }

    public void setBannerLink(String bannerLink) {
        this.bannerLink = bannerLink;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }
}
