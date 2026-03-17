package com.doconnect.discussion_service.controller;

import com.doconnect.discussion_service.entity.Question;
import com.doconnect.discussion_service.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    @GetMapping("/approved")
    public List<Question> getApprovedQuestions() {
        return questionService.getApprovedQuestions();
    }

    @GetMapping("/pending")
    public List<Question> getPendingQuestions() {
        return questionService.getPendingQuestions();
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    @PutMapping("/approve/{id}")
    public Question approveQuestion(@PathVariable Long id) {
        return questionService.approveQuestion(id);
    }

    @GetMapping("/search")
    public List<Question> searchQuestions(@RequestParam String keyword) {
        return questionService.searchApprovedQuestions(keyword);
    }
}