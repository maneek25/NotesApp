package com.javasampleapproach.dynamodb.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.*;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.validation.Valid;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.javasampleapproach.dynamodb.config.DynamoDBConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.javasampleapproach.dynamodb.model.Note;
import com.javasampleapproach.dynamodb.model.User;
import com.javasampleapproach.dynamodb.repo.NoteRepository;
import com.javasampleapproach.dynamodb.repo.UserRepository;

@CrossOrigin()
@RestController
public class WebController {

	@Autowired
	UserRepository repository;

	@Autowired
	NoteRepository notes;

	@Autowired
	DynamoDBConfig db;

	// Get all the notes
	@RequestMapping("/notes")
	public Iterable<Note> getAllNotes() {
		return notes.findAll();
	}

	// Add new note to database
	@RequestMapping("/add")
	public Note addNote(@RequestParam("username") String username, @RequestParam("topic") String topic,
						@RequestParam("content") String content, @RequestParam("title") String title) {
		Date date=java.util.Calendar.getInstance().getTime();
		Note note = new Note();
		note.setUserName(username);
		note.setTopic(topic);
		note.setContent(content);
		note.setCreatedAt(date.toString());
		note.setTitle(title);
		DynamoDBMapper mapper = new DynamoDBMapper(new AmazonDynamoDBClient(db.amazonAWSCredentials()));
		mapper.save(note);
		return note;
	}

	// Delete a Note
	@RequestMapping("/delete")
	public ResponseEntity<?> deleteNote(@RequestParam("id") String noteId) {
		Note note = notes.findOne(noteId);
		notes.delete(note);
		System.out.println(ResponseEntity.ok().build());
		return ResponseEntity.ok().build();
	}

	// Get All Notes as strings
	@RequestMapping("/noteslist")
	public String listAllNotes() {
		String result = "";
		Iterable<Note> all = notes.findAll();
		for (Note n : all) {
			result += n.toString() + "<br>";
		}
		return result;
	}

	// Update a Note's Topic
	@RequestMapping("/updateTopic")
	public Note updateTopic(@RequestParam("id") String noteId, @RequestParam("topic") String newTopic) {
		Note note = notes.findOne(noteId);
		note.setTopic(newTopic);
		Note updatedNote = notes.save(note);
		return updatedNote;
	}

	// Update a Note's Content
	@RequestMapping("/updateContent")
	public Note updateContent(@RequestParam("id") String noteId, @RequestParam("content") String newContent) {
		Note note = notes.findOne(noteId);
		note.setContent(newContent);
		Note updatedNote = notes.save(note);
		return updatedNote;
	}

	// Update a Note's Title
	@RequestMapping(value="/updateTitle",method=RequestMethod.POST)
	public Note updateTitle(@RequestParam("id") String noteId, @RequestParam("title") String newTitle) {
		Note note = notes.findOne(noteId);
		note.setTitle(newTitle);
		Note updatedNote = notes.save(note);
		return updatedNote;
	}

	// Get a Single Note by id
	@RequestMapping("/noteByID")
	public Note getNoteById(@RequestParam("id") String noteId) {
		return notes.findOne(noteId);
	}

	// Get all the notes by a specfic user
	@RequestMapping("/noteByUser")
	public List<Note> getNotesbyUserName(@RequestParam("username") String userName) {
		return notes.findByUserName(userName);
	}
	
	// Get all the notes with a specific topic
	@RequestMapping("/noteByTopic")
	public List<Note> getNotesbyTopic(@RequestParam("topic") String topic) {
		return notes.findByTopic(topic);
	}

	// User signup
	@RequestMapping("/signup")
	public Map<String, Boolean> signup(@RequestParam("email") String email, @RequestParam("firstname") String firstname,
						 @RequestParam("lastname") String lastname, @RequestParam("userName") String userName,
						 @RequestParam("password") String password, @RequestParam("phoneNumber") String phoneNumber) {
		User user = new User(email,firstname, lastname, userName, password, phoneNumber);
		Map<String, Boolean> map = new HashMap<>();
		if (repository.findOne(user.getEmail()) != null) {
			map.put("signup",false);
			return map;
		} else if (repository.findByUserName(user.getUserName()) != null) {
			map.put("signup",false);
			return map;
		} else {
			String encrypt = encryptPassword(user.getPassword(), "salt123");
			user.setPassword(encrypt);
			user.setSubscriptions(new ArrayList<String>());
			repository.save(user);
		}
		map.put("signup",true);
		return map;
	}

	// User login
	@RequestMapping("/login")
	public Map<String, Boolean> login(@RequestParam("email") String email, @RequestParam("password") String password) {
		User temp = repository.findOne(email);
		Map<String, Boolean> map= new HashMap<String, Boolean>();
		if (temp != null) {
			if (verifyPassword(password, temp.getPassword(), "salt123")) {
				map.put("login", true);
				return map;
			}
			else {
				map.put("login", false);
				return map;
			}
		}
		else {
			map.put("login", false);
			return map;
		}
	}

	// Subscribe to a topic
	@RequestMapping("/subscribe")
	public String subscribe(@RequestParam("email") String email, @RequestParam("topic") String topic) {
		User temp = repository.findOne(email);
		if(!temp.getSubscriptions().contains(topic)){
			temp.subscribe(topic);
		}
		repository.save(temp);
		return "Success";
	}

	// Unsubscribe to a topic
	@RequestMapping("/unSubscribe")
	public String unSubscribe(@RequestParam("email") String email, @RequestParam("topic") String topic) {
		User temp = repository.findOne(email);
		temp.unSubscribe(topic);
		repository.save(temp);
		return "Success";
	}

	// Get a list of all subscriptions of a user
	@RequestMapping("/getSubscriptions")
	public Object[] getSubscriptions(@RequestParam("email") String email) {
		User temp = repository.findOne(email);
		List<String> list = temp.getSubscriptions();
		return list.toArray();
	}

	// Delete a user
	@RequestMapping("/user/delete")
	public ResponseEntity<Object> deleteUser(@RequestParam("email") String email) {
		User user = repository.findOne(email);
		repository.delete(user);
		System.out.println(ResponseEntity.ok().build());
        return ResponseEntity.ok().build();
	}

	// List of all users
	@RequestMapping("/user/findall")
	public Iterable<User> findAll() {
		return repository.findAll();
	}

	// Find a specific user by email
	@RequestMapping("/user/findByEmail")
	public User findById(@RequestParam("email") String email) {
		return repository.findOne(email);
	}

	// Find all users with a specific lastname
	@RequestMapping("/user/findbylastname")
	public String fetchDataByLastName(@RequestParam("lastname") String lastName) {
		String result = "";
		for (User cust : repository.findByLastName(lastName)) {
			result += cust.toString() + "<br>";
		}
		return result;
	}

	// Encrypts password
	public static String encryptPassword (String password, String salt) {

		char[] chars = password.toCharArray();
		byte[] bytes = salt.getBytes();

		PBEKeySpec spec = new PBEKeySpec(chars, bytes, 65536, 512);

		Arrays.fill(chars, Character.MIN_VALUE);

		try {
		  SecretKeyFactory fac = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
		  byte[] securePassword = fac.generateSecret(spec).getEncoded();
		  return Base64.getEncoder().encodeToString(securePassword);

		} catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
		  System.err.println("Exception encountered in encryptPassword()");
		  return "";

		} finally {
		  spec.clearPassword();
		}
	}

	// Verifies encrypted password with input
	public static boolean verifyPassword (String password, String key, String salt) {
		String optEncrypted = encryptPassword(password, salt);
		return optEncrypted.equals(key);
	}
}
