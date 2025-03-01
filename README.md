I'll help you create a comprehensive README.md file and list all API endpoints for your Sound Sleep App backend. Based on the codebase, here are the API endpoints and the README.md content:

```markdown:d:\Backend_Sound_Sleep_App\README.md
# Sound Sleep App Backend

A RESTful API backend service for the Sound Sleep application that manages users and sound content.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)
- Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```plaintext
PORT=1000
MONGODB_URI=your_mongodb_connection_string
APP_URL=http://your-server-url:1000
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. Start the server
```bash
npm start
```

## API Endpoints

### User Management

#### Authentication
- **POST** `/api/users/signup`
  - Register a new user
  - Body: `multipart/form-data`
    - name (required)
    - email (required)
    - password (required)
    - image (optional)

- **POST** `/api/users/login`
  - Login user
  - Body: 
    - email (required)
    - password (required)

#### Password Management
- **POST** `/api/users/forgot-password`
  - Request password reset
  - Body:
    - email (required)

- **POST** `/api/users/verify-reset-code`
  - Verify OTP for password reset
  - Body:
    - email (required)
    - otp (required)

- **POST** `/api/users/reset-password`
  - Reset password (requires authentication)
  - Body:
    - currentPassword (required)
    - newPassword (required)

#### User Profile
- **PUT** `/api/users/update-user`
  - Update user profile (requires authentication)
  - Body: `multipart/form-data`
    - name (optional)
    - email (optional)
    - image (optional)

- **DELETE** `/api/users/delete-user/:email`
  - Delete user account
  - Params:
    - email (required)

### Sound Management

#### Sound Content
- **POST** `/api/sounds/dashboard/addSounds`
  - Add new sound (requires authentication)
  - Body: `multipart/form-data`
    - category (required)
    - title (required)
    - subtitle (required)
    - image (required)
    - audio (required)

- **GET** `/api/sounds/filterSounds`
  - Get sounds with optional filtering
  - Query Parameters:
    - category (optional)
    - search (optional)

## Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid JWT token in the Authorization header:

```plaintext
Authorization: <token>
```

## File Upload

- Supported image formats: JPG, JPEG, PNG
- Supported audio formats: MP3, WAV
- Files are stored in the `/uploads` directory

## Error Responses

The API returns consistent error responses in the following format:

```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (if available)"
}
```

## Success Responses

Successful responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```

## Development

To run the server in development mode with auto-reload:

```bash
npm start
```

## License

ISC
```

This README.md provides comprehensive documentation for your Sound Sleep App backend, including setup instructions, API endpoints, authentication details, and response formats. The API endpoints are organized by functionality (User Management and Sound Management) and include all the necessary information for making requests.

Would you like me to explain any specific part in more detail?
