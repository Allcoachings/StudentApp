package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/")
public class InstituteController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private InstituteService instituteService;

    @PostMapping("/")
    public ResponseEntity<Object> createInstitute(
            @RequestParam("file" ) MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("directorName")String directorName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("password") String password,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("state") String state,
            @RequestParam("category") long category,
            @RequestParam("about") String about,
            @RequestParam("status") int status

            )
    {
            String logo = "files/";
            logo += fileUploadService.storeFile(image);

            Institute i =  instituteService.save(new Institute(name,directorName,email,phone,password,address,city,state,category,about,logo,status));
            URI location = ServletUriComponentsBuilder
                            .fromPath("{id}")
                            .buildAndExpand(i.getId())
                            .toUri();
            return ResponseEntity.created(location).build();

    }

    @GetMapping("/{offset}/{data_limit}/{sortBy}")
    public Iterable<Institute> findAll(
                                @RequestParam(defaultValue = "0",name = "offset") Integer offset,
                                @RequestParam(defaultValue = "10",name = "data_limit") Integer data_limit,
                                @RequestParam(defaultValue = "id",name = "sortBy") String sortBy)
    {
        return  instituteService.getAllInstitute(offset,data_limit,sortBy);
    }

    @GetMapping("/{id}")
    public Optional<Institute> findById(@PathVariable long id)
    {
        return instituteService.findById(id);
    }




}
