package com.allcoaching.AllCoachingRestApi.Utils.Expo;


import io.github.jav.exposerversdk.ExpoPushMessage;
import io.github.jav.exposerversdk.ExpoPushTicket;
import io.github.jav.exposerversdk.PushClient;
import io.github.jav.exposerversdk.PushClientException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@ToString
@AllArgsConstructor
@Data
public class ExpoNotification {


    private ArrayList<String> to=null;
    private String title;
    private String body; //notification description
    private Map<String,Object> data;//for internal processing of app will not be visible to user

    public ExpoNotification() {
        this.to=new ArrayList<>();
    }

    public void sendNotification()
    {

        try
        {
            ExpoPushMessage expoPushMessage = new ExpoPushMessage();
            expoPushMessage.getTo().addAll(to);
            expoPushMessage.setTitle(title);
            expoPushMessage.setBody(body);
            expoPushMessage.setData(data);
            List<ExpoPushMessage> expoPushMessages = new ArrayList<>();
            expoPushMessages.add(expoPushMessage);
            PushClient client = new PushClient();
            CompletableFuture<List<ExpoPushTicket>> ticks = client.sendPushNotificationsAsync(expoPushMessages);
            System.out.println(ticks);
            
        }catch (Exception exception)
        {
            exception.printStackTrace();
        }


    }
}
