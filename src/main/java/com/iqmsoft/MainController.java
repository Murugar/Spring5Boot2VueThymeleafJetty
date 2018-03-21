package com.iqmsoft;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/vue")
    public String vue() {
        return "vue";
    }

    @RequestMapping("/vanilla")
    public String vanilla() {
        return "vanilla";
    }
}