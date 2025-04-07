# Backend API Documentation

## /users/register Endpoint

### Description
Registers a new user by creating a user account with the provided information.

### HTTP Method
POST

### Request Body
The request body should be in JSON format and include the following fields:

**fullname (object):**
- **firstname (string, required):** User's first name (minimum 3 characters).
- **lastname (string, optional):** User's last name (minimum 3 characters).
- **email (string, required):** User's email address (must be a valid email).
- **password (string, required):** User's password (minimum 6 characters).

### Example Response
**user (object):**
- **fullname (object):**
  - **firstname (string):** User's first name (minimum 3 characters).
  - **lastname (string):** User's last name (minimum 3 characters).
- **email (string):** User's email address (must be a valid email).
- **password (string):** User's password (minimum 6 characters).
- **token (string):** JWT Token


## /users/login Endpoint

### Description
Authenticates an existing user by verifying the provided email and password.

### HTTP Method
POST

### Request Body
The request body should be in JSON format and include the following fields:

- **email (string, required):** User's email address (must be a valid email).
- **password (string, required):** User's password (minimum 6 characters).

### Example Response
**user (object):**
- **fullname (object):**
  - **firstname (string):** User's first name.
  - **lastname (string):** User's last name.
- **email (string):** User's email address.
- **token (string):** JWT Token

## /users/profile Endpoint

### Description
Fetches the profile information of the currently authenticated user.

### HTTP Method
GET

### Authentication
Requires a valid authentication token provided as:
- Cookie named 'token'
- Authorization header with format 'Bearer [token]'

### Example Response
**user (object):**
- **_id (string):** User's unique ID.
- **fullname (object):**
  - **firstname (string):** User's first name.
  - **lastname (string):** User's last name.
- **email (string):** User's email address.

## /users/logout Endpoint

### Description
Logs out the currently authenticated user by invalidating their token.

### HTTP Method
GET

### Authentication
Requires a valid authentication token provided as:
- Cookie named 'token'
- Authorization header with format 'Bearer [token]'

### Example Response
```json
{
  "message": "Logout successfully"
}
```