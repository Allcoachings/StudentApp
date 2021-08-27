package com.allcoaching.AllCoachingRestApi.Utils.Admin;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("allCoaching.admin")
@Data
public class AdminConfig {
    private String image;
    private long id;
    private String name;
}
