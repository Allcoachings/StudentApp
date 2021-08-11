package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.InstituteService;
import com.allcoaching.AllCoachingRestApi.dto.InsCredentialDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/institute/")
@Api(value = "Institute" , description = "Institute detail controller")
public class InstituteController {

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private InstituteService instituteService;

    @CrossOrigin(origins = "*")
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

    @CrossOrigin(origins = "*")
    @PostMapping("/validate/")
    public Optional<Institute> validateIns(@RequestBody InsCredentialDto insCredentialDto)
    {
                   return instituteService.validateIns(insCredentialDto);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{offset}/{data_limit}/{sortBy}")
    public Iterable<Institute> findAll(
                                @PathVariable(name = "offset") Integer offset,
                                @PathVariable(name = "data_limit") Integer data_limit,
                                @PathVariable(name = "sortBy") String sortBy)
    {
        return  instituteService.getAllInstitute(offset,data_limit,sortBy);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Institute> findById(@PathVariable long id)
    {
        return instituteService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/category/{category}/{page}/{offset}")
    public Iterable<Institute> findInstituteByCategory(@PathVariable long category,@PathVariable int page,@PathVariable  int offset)
    {
        Pageable topTwenty = PageRequest.of(page, offset);
        return instituteService.findByCategory(category,topTwenty);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/status/{status}/{insId}")
    public ResponseEntity<Object> updateStatus(@PathVariable int status,@PathVariable long insId)
    {
        instituteService.updateStatus(status,insId);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteIns(@PathVariable long id)
    {
        instituteService.deleteIns(id);
        return  ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/boost/{boostvalue}/{id}")
    public ResponseEntity<Object> boostIns(@PathVariable int boostvalue,@PathVariable long id)
    {
        instituteService.boostIns(id,boostvalue);
        return  ResponseEntity.ok().build();
    }



}
