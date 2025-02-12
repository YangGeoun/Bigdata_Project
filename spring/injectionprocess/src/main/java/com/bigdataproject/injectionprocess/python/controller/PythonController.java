package com.bigdataproject.injectionprocess.python.controller;

import com.bigdataproject.injectionprocess.python.service.PythonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/python")
public class PythonController {

    private final PythonService pythonService;

    @GetMapping("/")
    public String a() {
        return "123";
    }

    @GetMapping("/test")
    public String test() {
        return pythonService.runPythonScript();
    }
}
