# Sound Sleep App Backend

A RESTful API backend service for the **Sound Sleep** application, designed to manage users and sound content efficiently.

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **JWT Authentication** - Secure user authentication
- **Multer** - Middleware for handling file uploads
- **Nodemailer** - Email handling for password reset

---

## Prerequisites

Ensure you have the following installed before running the project:

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Cloud)
- **npm** or **yarn** package manager

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Backend_Sound_Sleep_App
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=1000
   MONGODB_URI=your_mongodb_connection_string
   APP_URL=http://your-server-url:1000
   JWT_SECRET=your_jwt_secret
   SENDER_EMAIL=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### **User Management**

#### **Authentication**
- **Register a new user**  
  **POST** `/api/users/signup`  
  **Body (multipart/form-data):**
  - `name` (required)
  - `email` (required, unique)
  - `password` (required)
  - `image` (optional, profile picture upload)

- **User login**  
  **POST** `/api/users/login`  
  **Body (JSON):**
  - `email` (required)
  - `password` (required)

#### **Password Management**
- **Request password reset**  
  **POST** `/api/users/forgot-password`  
  **Body (JSON):**
  - `email` (required)

- **Verify OTP for password reset**  
  **POST** `/api/users/verify-reset-code`  
  **Body (JSON):**
  - `email` (required)
  - `otp` (required, sent via email)

- **Reset password**  
  **POST** `/api/users/reset-password`  
  **Body (JSON):**
  - `currentPassword` (required)
  - `newPassword` (required)

#### **User Profile Management**
- **Update user profile** (requires authentication)  
  **PUT** `/api/users/update-user`  
  **Body (multipart/form-data):**
  - `name` (optional)
  - `email` (optional)
  - `image` (optional, profile picture update)

- **Delete user account**  
  **DELETE** `/api/users/delete-user/:email`  
  **Params:**
  - `email` (required)

---

### **Sound Management**

#### **Sound Content**
- **Add a new sound** (requires authentication)  
  **POST** `/api/sounds/dashboard/addSounds`  
  **Body (multipart/form-data):**
  - `category` (required)
  - `title` (required)
  - `subtitle` (required)
  - `image` (required, sound cover image)
  - `audio` (required, sound file in MP3/WAV format)

- **Get sounds with optional filtering**  
  **GET** `/api/sounds/filterSounds`  
  **Query Parameters:**
  - `category` (optional, filter by sound category)
  - `search` (optional, search by title)

---

## Authentication

The API uses **JWT (JSON Web Token)** for secure authentication. Protected routes require a valid **JWT token** in the `Authorization` header:

```plaintext
Authorization: Bearer <token>
```

---

## File Uploads

- **Supported image formats:** `JPG`, `JPEG`, `PNG`
- **Supported audio formats:** `MP3`, `WAV`
- Files are stored in the `/uploads` directory

---

## API Response Formats

### **Error Responses**

```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (if available)"
}
```

### **Success Responses**

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```

---

## Development

To run the server in development mode with **nodemon** (auto-reload):

```bash
npm run dev
```

---

## License

This project is licensed under the **ISC License**.

---

## Contact

For support or inquiries, please email: **tqmhosain@gmail.com**
