package com.allcoaching.restApi;

import org.springframework.web.bind.annotation.*;


@RestController
public class HelloWorldController
{



    @GetMapping("/hello-world")
    public  String helloWorld()
    {
        return "Hello Pancham";
    }
    @GetMapping("/hello-world-bean")
    public  HelloWorldBean helloWorldBean()
    {
        return new HelloWorldBean("Hello Pancham");
    }
    @GetMapping("/hello-world/{name}")
    public  HelloWorldBean helloWorldPathVar(@PathVariable String name)
    {
        return new HelloWorldBean("Hello Pancham "+name);
    }
}
