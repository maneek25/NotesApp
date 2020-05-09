San Jose State University

Course: Enterprise Software - CMPE 172/Spring 2020

Team Members: Maneek Dhillon, Gaston Garrido, Udaypal Singh

Project Introduction:
NoteApp lets users to create an account and log in using email and password. The application allows users to create a note which will be available and can be viewed by everyone. A note has a topic, title, content, username, and created at fields. Although every user can see the note, only the user who created it will have the authority to edit or delete it. Our application will let users subscribe to a topic which will be very convenient to manage topics which users are interested in. If at some point user wants to unsubscribe to topic, there is also unsubscribe option for that functionality. Overall, our application will create a platform to share notes with different topics which will be easily be accessible from our home page.

Sample Demo Screenshots:
At the start of the application, a user can log in if an account exist.
![](Images/login.JPG)

If a user does not have an account, he or she can easily create it by clicking on the Sign-Up link in the bottom right corner.
![](Images/signup.JPG)


After creating an account, a user can log in, and the user will be redirected to the home page where all the notes will be available.
![](Images/home.JPG)


A user may add a note by clicking on the plus button at the top of the home page. After clicking on the add button, a user will be redirected to add page where details about the new note can be filled out.
![](Images/addnote.JPG)


After clicking on "Create Note" button, user will be redirected back to home page. From home page a user may want to view a note in more detail. This can be achieved by clicking on the "View Button" on the card, and user will be redirected to a page with more detail about a note. To go back to home, user can click on the back button on the bottom of the detailed note card.
![](Images/viewNote.JPG)


A user can check out the notes which a user is interested in and subscribe to a topic. If a user subscribes to a topic, the notes associated with the topic will be listed under the subscribed notes. All subscribed notes can be accessed by clicking on subscribed tag.
![](Images/subscribed.JPG)


Notes created by the user can be accessed by clicking on "Created by You".
![](Images/ccreatedByYou.JPG)


Profile can be accessed by clicking on the profile link from the navigation bar placed at the top of the page. Profile gives you access to edit or delete a note you have created.
![](Images/profile.JPG)


Pre-requisites for setup:
For running locally:
1. A running computer with a functional operating system
2. Internet Access
3. Spring boot should be installed (IntelliJ can also be used for Spring boot) 
4. maven should be installed 
5. An editor (Visual Studios Code is preferred)
6. A browser with JavaScript enabled

For running with global URL:
1. A browser with JavaScript enabled
2. Internet Access

Instructions on how to run the project locally:
Make sure you have maven installed.

Run without docker:
1. Open terminal and go into NotesApp directory 
2. Run "mvn clean install"
3. Now you can run the backend by entering the command "mvn spring-boot:run"
4. download frontend from the repo https://github.com/udaypalsingh/NotesApp-React
5. Open terminal and go to the directory where you downloaded the frontend
6. Run "npm install"
7. Run "npm start"

Run with Docker:
1. Make sure you have docker installed and it is running. 
2. Open terminal and go into NotesApp directory 
3. Run "mvn clean install"
4. Run "sudo docker build -t noteapp:1.0 ."
5. Run "sudo docker run -p 8080:8080 -t noteapp:1.0"
6. Download frontend from the repo https://github.com/udaypalsingh/NotesApp-React
7. Open terminal and go to the directory where you downloaded the frontend
8. Run "npm install"
9. Run "npm start"

Useful Docker commands:
1. List all containers: "sudo docker ps"
2. Stop a container by container id: "sudo docker stop 3e36a2c0c241"
3. tag image: "sudo docker image tag noteapp:1.0 your_id/noteapp:1.0"
4. Push Image to docker hub: run tag image command then run "sudo docker image push your_id/noteapp:1.0"

UML Diagrams:
UML Class Diagram
![](Images/UML_class.png)

Sequence Diagram
![](Images/sequence_diagram.png)

Schema:

Database Queries:

Mid tier APIs:

UI data transport:
Data is transferred with Json objects

