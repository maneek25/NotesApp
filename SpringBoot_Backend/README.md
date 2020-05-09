Make sure you have maven installed.

Run without docker:
1. Open terminal and go into NotesApp directory 
2. Run "mvn clean install"
3. Now you can run the backend by entering the command "mvn spring-boot:run"

Run with Docker:
1. Make sure you have docker installed and it is running. 
2. Open terminal and go into NotesApp directory 
3. Run "mvn clean install"
4. Run "sudo docker build -t noteapp:1.0 ."
5. Run "sudo docker run -p 8080:8080 -t noteapp:1.0"

Useful Docker commands:
1. List all containers: "sudo docker ps"
2. Stop a container by container id: "sudo docker stop 3e36a2c0c241"
3. tag image: "sudo docker image tag noteapp:1.0 your_id/noteapp:1.0"
4. Push Image to docker hub: run tag image command then run "sudo docker image push your_id/noteapp:1.0"