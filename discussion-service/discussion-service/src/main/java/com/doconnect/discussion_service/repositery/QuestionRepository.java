package com.doconnect.discussion_service.repositery;

import com.doconnect.discussion_service.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByApprovedTrue();

    List<Question> findByApprovedFalse();

    List<Question> findByApprovedTrueAndTitleContainingIgnoreCase(String keyword);

    List<Question> findByApprovedTrueAndDescriptionContainingIgnoreCase(String keyword);
}