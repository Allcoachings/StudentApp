package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Service.FileUploadService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;

@RestController
@Api()
public class FileController {

    @Autowired
    private FileUploadService fileUploadService;

    @CrossOrigin(origins = "*")
    @GetMapping("/files/{imageName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String imageName, HttpServletRequest request) {
        Resource resource = null;
        if (imageName != null && !imageName.isEmpty()) {
            try {
                resource = fileUploadService.loadFileAsResource(imageName);

            } catch (Exception e) {

                e.printStackTrace();

            }
            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

            } catch (IOException ex) {

                //logger.info("Could not determine file type.");

            }
            // Fallback to the default content type if type could not be determined

            if (contentType == null) {

                contentType = "application/octet-stream";

            }
            return ResponseEntity.ok()

                    .contentType(MediaType.parseMediaType(contentType))

                    .header("attachment; filename=\"" + resource.getFilename() + "\"")

                    .body(resource);

        } else {

            return ResponseEntity.notFound().build();

        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/v1/files/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam MultipartFile file)
    {
        String fileAddr ="files/";
        fileAddr += fileUploadService.storeFile(file);
        HttpHeaders headers = new HttpHeaders();
        System.out.println(fileAddr);
        headers.add("Access-Control-Expose-Headers", "Location");
        URI location = ServletUriComponentsBuilder.fromPath("{addr}").buildAndExpand(fileAddr).toUri();
        return ResponseEntity.created(location).headers(headers).build();
    }
}
