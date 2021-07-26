package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private FileUploadService fileUploadService;
    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> createStudent(@RequestBody Student student)
    {
        Student s = studentService.createStudent(student);
        URI location = ServletUriComponentsBuilder
                .fromPath("{id}")
                .buildAndExpand(s.getId())
                .toUri();
        return ResponseEntity.created(location).build();

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/update/profile")
    public ResponseEntity<Object> updateProfilePic(@RequestParam("image") MultipartFile image,@RequestParam("id") long id)
    {



        Optional<Student> s = studentService.findById(id);
        String filename = "files/";
        if (s.isPresent()) {
            filename += fileUploadService.storeFile(image);
            studentService.updateProfilePic(filename, id);

            s.get().setStudentImage(filename);
            studentService.createStudent(s.get());
            URI location = ServletUriComponentsBuilder
                    .fromPath("{imageLocation}")
                    .buildAndExpand(filename)
                    .toUri();
            return ResponseEntity.created(location).build();
        }else
        {
            return ResponseEntity.badRequest().build();
        }


    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public Optional<Student> findById(@PathVariable long id)
    {
        return  studentService.findById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/bymobile/{mobileNumber}")
    public Optional<Student> findByMobileNumber(@PathVariable String mobileNumber)
    {
        return  studentService.findByMobileNumber(mobileNumber);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{offset}/{data_limit}")
    public Iterable<Student> findAll(@PathVariable(name = "offset") int offset,
                                     @PathVariable(name = "data_limit") int data_limit
                                     )
    {
        return studentService.findAll(offset,data_limit);
    }


}
