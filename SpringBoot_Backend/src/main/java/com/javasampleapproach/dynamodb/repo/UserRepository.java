package com.javasampleapproach.dynamodb.repo;

import java.util.List;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.dynamodb.model.User;

@EnableScan
public interface UserRepository extends CrudRepository<User, String> {

	List<User> findByLastName(String lastName);
	User findByUserName(String userName);
}
