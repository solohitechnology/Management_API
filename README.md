Management API Documentation
Overview


The Management API provides endpoints for user registration and login.

Base URL
All endpoints are relative to the base URL:

arduino
Copy code
https://localhost:9000/api

Authentication
Authentication is handled through JSON Web Tokens (JWT). After successful login,
 the API will return an access token and a refresh token. Include the access token 
 in the Authorization header for protected endpoints.

Authorization: Bearer access_token
Endpoints












1. User Registration
POST /register
Register a new user.

Request:

EXAMPLE:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "username": "john_doe",
  "city": "City",
  "address": "123 Street",
  "state": "State",
  "password": "securepassword"
}



Response (Success):

{
  "message": "Registration successful",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "username": "john_doe",
    "city": "City",
    "address": "123 Street",
    "state": "State",
    "createdAt": "timestamp"
  }
}


Response (Error):

json
Copy code
{
  "errors": [
    {
      "msg": "Validation error message"
    }
  ]
}











2. User Login
POST /login
Authenticate and log in a user.

Request:

{
  "email": "john.doe@example.com",
  "password": "userpassword"
}



Response (Success):

{
  "message": "Login successful",
  "accessToken": "your_access_token",
  "refreshToken": "your_refresh_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "username": "john_doe",
    "city": "City",
    "address": "123 Street",
    "state": "State",
    "createdAt": "timestamp"
  }
}
Response (Error):


{
  "errors": [
    {
      "msg": "Invalid credentials"
    }
  ]
}



Error Handling
If a request fails, the API will return a JSON object with an errors property containing an array of error messages.





