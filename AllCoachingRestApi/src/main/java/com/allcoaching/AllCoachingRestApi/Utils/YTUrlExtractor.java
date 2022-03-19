package com.allcoaching.AllCoachingRestApi.Utils;

import com.allcoaching.AllCoachingRestApi.dto.YTExtractorDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class YTUrlExtractor {

    public static YTExtractorDto getYTUrlExtractor(String ytUrl)
    {


        try {
//            String command = "curl -X POST http://localhost:8081/getYtjson    -H \"Content-Type: application/json\"\n" +
//                    "   -d '{\"url\": '"+ytUrl+"'}'  ";
//            Process process = Runtime.getRuntime().exec(command);
//            InputStream inputStream = process.getInputStream();
//            String result = IOUtils.toString(inputStream, StandardCharsets.UTF_8);


            URL url = new URL("http://localhost:8082/getYtjson");
            HttpURLConnection http = (HttpURLConnection)url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");
            String data = "{\"url\":\""+ytUrl+"\"}";
            byte[] out = data.getBytes(StandardCharsets.UTF_8);
            OutputStream stream = http.getOutputStream();
            stream.write(out);
            System.out.println(http.getResponseCode() + " " + http.getResponseMessage());

            if(http.getResponseMessage().equals("OK"))
            {
                BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
                String inputLine;
                StringBuilder content = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }
                in.close();

                ObjectMapper objectMapper = new ObjectMapper();
                YTExtractorDto ytExtractorDto = objectMapper.readValue(content.toString(), YTExtractorDto.class);
                http.disconnect();
                return ytExtractorDto;

            }else
            {
                http.disconnect();
                return new YTExtractorDto();
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
        return new YTExtractorDto();
    }
}
