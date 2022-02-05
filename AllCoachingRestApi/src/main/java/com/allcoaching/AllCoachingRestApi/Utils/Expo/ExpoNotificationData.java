package com.allcoaching.AllCoachingRestApi.Utils.Expo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Map;

@ToString
@Data
public class ExpoNotificationData {



    private ArrayList<String> to=null;
    private String title;
    private String body; //notification description
    private Map<String,Object> data;//for internal processing of app will not be visible to user
    public ExpoNotificationData() {
        this.to=new ArrayList<>();
    }

    public ExpoNotificationData(ArrayList<String> to, String title, String body, Map<String, Object> data) {
        this.to=new ArrayList<>();
        this.to = to;
        this.title = title;
        this.body = body;
        this.data = data;
    }
}
