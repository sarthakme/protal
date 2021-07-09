## Authentication Enabled Services

Endpoints -

POST /signup - For a user to create their account - returns JWT  
Body keys required - username, password

POST /signin - For a user to log in to an existing account - returns JWT  
Body keys required - username, password

GET /intro - For an introductory message to be returned if JWT authentication is satisfied, otherwise, the user is redirected to the sign-up form(not built yet)

GET /jobs - For returning a static array of job objects with the following keys - id, name, owner, assignedTo  
assignedTo being optional

POST /meme - For returning an image of the Success Kid meme  
Body keys required - code  
code must have value = PROTAL for the correct response

### Scripts

start - To build the project and strt the server

### Additional information

First thing to do is running npm install. This will download all the dependencies listed in package.json.  
Create a file called .env in the root folder conataining the following keys -

POSTGRES_HOST - Value is the address of the postgres database you are trying to connect to  
POSTGRES_DB - Value is the name of the database you are trying to connect to which should conatain a table called users with the listed schema  
POSTGRES_USER - Value is the name of the user in postgres  
POSTGRES_PASSWORD - Value is the password of the specified user  
POSTGRES_PORT - Value is the port in which postres is running (default: 5432)  
BCRYPT_PASSWORD - Value is any secret for peppering the bcrypt salt  
SALT_ROUNDS - Value is the number of rounds for which salting is required  
TOKEN_SECRET - Value is the encryption key for the json web tokens