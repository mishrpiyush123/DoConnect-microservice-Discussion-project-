package com.doconnect.discussion_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.discussion_service.entity.Answer;
import com.doconnect.discussion_service.service.AnswerService;

@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://localhost:5173")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping("/add")
    public Answer addAnswer(@RequestBody Answer answer) {
        return answerService.addAnswer(answer);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable Long questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }
}