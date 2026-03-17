package com.doconnect.discussion_service.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doconnect.discussion_service.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}