package com.allcoaching.AllCoachingRestApi.Utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class Mailer  {

    @Autowired
    private Environment env;

    @Autowired
    private JavaMailSender javaMailSender;

     public String  sendMail(
            String to, String subject, String text) {
        try {
//            System.out.println("sending simple message");
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setFrom(env.getProperty("spring.mail.username"));
//            System.out.println("simple message from "+env.getProperty("spring.mail.username")+" to "+to);
//            message.setTo(to);
//            message.setSubject(subject);
//            message.setText(text);
//            javaMailSender.send(message);
//            System.out.println("Mail sent");
            MimeMessage message = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(env.getProperty("spring.mail.username"));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text,true);

            javaMailSender.send(message);
            return "ok";
        }
        catch (MailException | MessagingException e)
        {
           e.printStackTrace();
           System.out.println("Error Cathed");
            return "err : "+e.getMessage();
        }
    }


}
