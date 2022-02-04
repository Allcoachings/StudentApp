package com.allcoaching.AllCoachingRestApi.Utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Sms {

    private String baseUrl = "https://www.fast2sms.com/dev/bulkV2";
    private String route="dlt";
    private String senderId="ALLCOG";
    private String messageTemplateId="111443";
    private ArrayList<String> numbers = new ArrayList<String>();
    private ArrayList<String> variableValues = new ArrayList<>();
    private int sendAsFlashMessage =0;//0 false 1 true
    private String requestMethod="GET";

    public Sms(String route, String sender_id, String messageTemplateId, ArrayList<String> numbers, ArrayList<String> variable_values, int sendAsFlashMessage, String requestMethod)
    {
        this.route = route;
        this.senderId = sender_id;
        this.messageTemplateId = messageTemplateId;
        this.numbers = numbers;
        this.variableValues = variable_values;
        this.sendAsFlashMessage = sendAsFlashMessage;
        this.requestMethod = requestMethod;
    }
}
