package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Category;
import com.allcoaching.AllCoachingRestApi.Entity.ContactUs;
import com.allcoaching.AllCoachingRestApi.Service.ContactUsService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/contact_us")
@Api()
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody ContactUs contactUs)
    {
        ContactUs saved_contactUs = contactUsService.save(contactUs);
        URI location  = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(saved_contactUs.getId()).toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");
        return ResponseEntity.created(location).headers(headers).build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id)
    {
         contactUsService.delete(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{offset}/{dataLimit}")
    public Iterable<ContactUs> fetch(@PathVariable int offset,@PathVariable int dataLimit)
    {
         return  contactUsService.fetch(offset,dataLimit);

    }
}
