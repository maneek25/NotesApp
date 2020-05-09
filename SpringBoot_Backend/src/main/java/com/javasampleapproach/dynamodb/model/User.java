package com.javasampleapproach.dynamodb.model;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "User")
public class User {

	private String email;
	private String firstName;
	private String lastName;
	private String userName;
	private String password;
	private String phoneNumber;
	private List<String> subscriptions;

	public User() {
	}

	public User(String email, String firstName, String lastName, String userName, String password, String phoneNumber) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.subscriptions = new ArrayList<String>();
	}

	@DynamoDBHashKey(attributeName = "Email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@DynamoDBAttribute(attributeName = "FirstName")
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@DynamoDBAttribute(attributeName = "LastName")
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@DynamoDBAttribute(attributeName = "UserName")
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@DynamoDBAttribute(attributeName = "Password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@DynamoDBAttribute(attributeName = "PhoneNumber")
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@DynamoDBAttribute(attributeName = "Subscriptions")
	public List<String> getSubscriptions() {
		return subscriptions;
	}

	public void setSubscriptions(List<String> subscriptions) {
		this.subscriptions = subscriptions;
	}

	public void subscribe(String topic) {
		this.subscriptions.add(topic);
	}

	public void unSubscribe(String topic) {
		this.subscriptions.remove(topic);
	}

	@Override
	public String toString() {
		return String.format("User[email=%s, firstName='%s', lastName='%s', userName='%s', phoneNumber='%s']", email, firstName, lastName, userName, phoneNumber);
	}

}