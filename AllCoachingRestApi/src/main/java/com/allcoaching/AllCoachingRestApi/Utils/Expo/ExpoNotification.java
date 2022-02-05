package com.allcoaching.AllCoachingRestApi.Utils.Expo;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jav.exposerversdk.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@ToString
@AllArgsConstructor
@Data
public class ExpoNotification {




    public static String  sendNotification(ExpoNotificationData expoNotificationData)
    {
        try {
            URL url = new URL("https://exp.host/--/api/v2/push/send");
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");


            ObjectMapper objectMapper = new ObjectMapper();
            // Converting the Java object into a JSON string
            String notificationData = objectMapper.writeValueAsString(expoNotificationData);
            // Displaying Java object into a JSON string
            System.out.println(notificationData);



            byte[] out = notificationData.getBytes(StandardCharsets.UTF_8);

            OutputStream stream = http.getOutputStream();
            stream.write(out);

            System.out.println(http.getResponseCode() + " " + http.getResponseMessage());

            http.disconnect();
            return http.getResponseMessage();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return  e.getMessage();
        }



    }
}
