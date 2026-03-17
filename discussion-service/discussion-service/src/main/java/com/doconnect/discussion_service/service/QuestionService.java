package com.doconnect.discussion_service.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doconnect.discussion_service.entity.Question;
import com.doconnect.discussion_service.repositery.QuestionRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        question.setApproved(false);
        return questionRepository.save(question);
    }

    public List<Question> getApprovedQuestions() {
        return questionRepository.findByApprovedTrue();
    }

    public List<Question> getPendingQuestions() {
        return questionRepository.findByApprovedFalse();
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    public Question approveQuestion(Long id) {
        Question question = questionRepository.findById(id).orElse(null);
        if (question != null) {
            question.setApproved(true);
            return questionRepository.save(question);
        }
        return null;
    }

    public List<Question> searchApprovedQuestions(String keyword) {
        List<Question> byTitle = questionRepository.findByApprovedTrueAndTitleContainingIgnoreCase(keyword);
        List<Question> byDescription = questionRepository.findByApprovedTrueAndDescriptionContainingIgnoreCase(keyword);

        List<Question> result = new ArrayList<>(byTitle);
        for (Question q : byDescription) {
            boolean exists = result.stream().anyMatch(item -> item.getId().equals(q.getId()));
            if (!exists) {
                result.add(q);
            }
        }
        return result;
    }
}