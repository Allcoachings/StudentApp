package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import com.allcoaching.AllCoachingRestApi.Service.StudentService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/student")
@Api(value = "student",description = "Student Detail Controller")
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

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Expose-Headers", "Location");

        return ResponseEntity.created(location).headers(headers).build();

    }
    @CrossOrigin(origins = "*")
    @PutMapping("/status/{status}/{studentId}")
    public ResponseEntity<Object> updateStatus(@PathVariable boolean status,@PathVariable long studentId)
    {
        studentService.updateBlockedStatus(status,studentId);
        return ResponseEntity.ok().build();
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

    @CrossOrigin(origins = "*")
    @GetMapping("/all/{status}/{offset}/{data_limit}")
    public Iterable<Student> findAllWithStatus(
                                    @PathVariable(name = "status") boolean status,
                                    @PathVariable(name = "offset") int offset,
                                     @PathVariable(name = "data_limit") int data_limit
                                     )
    {
        return studentService.findAllWithStatus(status,offset,data_limit);

    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id)
    {
        studentService.delete(id);
        return ResponseEntity.ok().build();
    }

}
