package com.javasampleapproach.dynamodb.repo;

import java.util.List;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.dynamodb.model.Note;

@EnableScan
public interface NoteRepository extends CrudRepository<Note, String> {

	List<Note> findByUserName(String userName);
	List<Note> findByTopic(String topic);
}