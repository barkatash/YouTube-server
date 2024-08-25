# project2024-server
Ishay, Sagi, and Bar project

project state: in process
A web server for our YouTube, serving the web and android clients.
This project was done as part of the Advanced Programming course, Bar-Ilan University, 2024.
This version already includes the mongoDB and served the web client.
The Android app for this can be found here on branch main-server: https://github.com/ishay970/Project2024android
The web client can be found here on branch main-server: https://github.com/ishay970/project2024
According to the environment variables you should create a folder called "config" and inside to create a file called ".env.local" contains
2 values: CONNECTION_STRING, PORT. The CONNECTION_STRING need to be the path to your mongoDB connection concat with "/youtube"
(because thats the db name) and the PORT as you wish, i used 8080.

The server with cpp server is on cpp-server branch (this one).
To compile it run thie commend from the cpp folder:
g++ -std=c++14 -pthread server.cpp -o server
To run the cpp server run: ./server 
from the cpp folder.
The cpp server is listening on port 3333.

To run the js server, use "npm run start".
Dependencies:
JWT Bearer
express
cors
bodyParser
mongoose
mongodb
multer
jsonwebtoken
custom-env
dotenv

you also need to have the mongo Db and to get the videos, users and all the data so you should run the script named: script.js from this repository.
