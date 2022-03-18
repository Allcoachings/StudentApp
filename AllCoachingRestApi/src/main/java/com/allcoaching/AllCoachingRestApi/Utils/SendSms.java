package com.allcoaching.AllCoachingRestApi.Utils;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class SendSms {
    final String DLT_ROUTE ="dlt";
    final String SENDERID_ALLCOG="AllCOG";
    final String OTP_MESSAGE_TEMPLATE_ID="111443";


    public String sendOptOverMessage(String number,String otp)
    {

        ArrayList<String> numbers = new ArrayList<>();
        ArrayList<String> variables = new ArrayList<>();
        variables.add(otp);
        numbers.add(number);

        Sms sms  = new Sms(DLT_ROUTE,SENDERID_ALLCOG,OTP_MESSAGE_TEMPLATE_ID,numbers,variables,0,"GET");
        return sendMessage(sms);
    }

    public String sendMessage(Sms sms)
    {


        try {
            String variables = URLEncoder.encode(String.join("|",sms.getVariableValues()), StandardCharsets.UTF_8.toString()) ;
            String numbers = URLEncoder.encode(String.join(",",sms.getNumbers()),StandardCharsets.UTF_8.toString());
            String command = "curl -X "+sms.getRequestMethod()+" https://www.fast2sms.com/dev/bulkV2?authorization=blwRVFk8yu6cAS2dmt5X9IjQ0reDoYfHJ7vh4ai3UnxzpKgOsPxb0umhZ5CXE6Lf2e4WykJPMNQRUpA7&route="+sms.getRoute()+"&sender_id="+sms.getSenderId()+"&message="+sms.getMessageTemplateId()+"&variables_values="+variables+"&flash="+sms.getSendAsFlashMessage()+"&numbers="+numbers;

            Process process = Runtime.getRuntime().exec(command);
            InputStream inputStream = process.getInputStream();
            String result = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            System.out.println(result);
            return result;


        } catch (IOException e) {
            e.printStackTrace();
        }


        return "error";
    }




}
