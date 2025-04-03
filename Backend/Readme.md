# User Registration API Documentation

## Endpoint: `POST /users/register`

### Description
This endpoint allows new users to register by providing their details. It validates the input, hashes the password, and stores the user in the database. Upon successful registration, a token is generated and returned.

---

## Request Structure

### URL

/users/register

### Method

POST


### Headers
```json
Content-Type: application/json

Request Body (JSON)
The request must contain the following fields:

{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "securepassword"
}


Response Structure
Success Response (201 Created)
If the user registration is successful, the API returns a JSON response containing the generated authentication token and user details.

Example Response:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "660b3fef6e2a5f0012345678",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "johndoe@example.com"
    }
}

Error Responses
400 Bad Request
Occurs if validation fails (e.g., missing fields, invalid email format, weak password, etc.).

Example Response:

{
    "errors": [
        {
            "msg": "First Name must be at least 3 characters Long",
            "param": "fullName.firstName",
            "location": "body"
        },
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}

500 Internal Server Error
Occurs if there is an unexpected error during user creation.

Example Response:

{
    "message": "Internal Server Error"
}

Notes
Passwords are securely hashed before storing in the database.

If the email is already registered, a unique constraint error will occur.

The token returned is a JSON Web Token (JWT) used for authentication.

Author
Uber Project Development Team


You can now copy and paste this directly into your `README.md` file in VS Code. Let me know if you need any changes! 🚀
