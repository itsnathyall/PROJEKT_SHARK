# 📚 API Documentation

## 🗝️ **Authentication (Auth)**

### **1. Register User**
- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user.
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John",
    "lastname": "Doe",
    "username": "johndoe"
  }
  ```
- **Response:** Successful user registration.

---

### **2. Login User**
- **Endpoint:** `POST /auth/login`
- **Description:** User login and token generation.
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns `authToken` for authorization.

**Where to Get the Token:**  
After a successful login, the response will include an `authToken`. Copy this token to authenticate your requests.

Example Response:
```json
{
  "message": "Login successful",
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **3. Logout User**
- **Endpoint:** `POST /auth/logout`
- **Description:** Log out the user (client-side token removal is required).
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```

---

## 📝 **Posts (Stories)**

### **1. Create a Post**
- **Endpoint:** `POST /posts`
- **Description:** Create a new post.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "title": "My First Post",
    "body": "This is the content of the post.",
    "description": "Short description here."
  }
  ```
- **Response:** Returns the created post.

---

### **2. Get All Posts**
- **Endpoint:** `GET /posts`
- **Description:** Retrieve a list of all posts.
- **No Authorization Required**

---

### **3. Update a Post**
- **Endpoint:** `PUT /posts/:id`
- **Description:** Update a post (only the author can update).
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "body": "Updated content."
  }
  ```
- **Response:** Confirmation of successful update.

------

## 💬 **Comments**

### **1. Add a Comment**
- **Endpoint:** `POST /posts/:id/comments`
- **Description:** Add a comment to a specific post.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "commentBody": "This is a comment."
  }
  ```
- **Response:** Confirmation of successful comment addition with the updated post.

---

## 👍 **Likes**

### **1. Toggle Like (Add/Remove Like)**
- **Endpoint:** `POST /posts/:id/like`
- **Description:** Add or remove a like for a specific post. A user can only like a post once. If the user has already liked the post, this will remove the like.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Response:**
  ```json
  {
    "message": "Like added.",
    "likes": 10
  }
  ```
  or
  ```json
  {
    "message": "Like removed.",
    "likes": 9
  }
  ```

---

## 👤 **Users**

### **1. Get User Info**
- **Endpoint:** `GET /users/:id`
- **Description:** Retrieve user information.
- **No Authorization Required**

---

### **2. Update User**
- **Endpoint:** `PUT /users/:id`
- **Description:** Update user information.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "name": "Updated Name",
    "lastname": "Updated Lastname"
  }
  ```
- **Response:** Confirmation of successful update.

---

### **3. Delete User**
- **Endpoint:** `DELETE /users/:id`
- **Description:** Delete a user account.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Response:** Confirmation of successful deletion.

---

### **4. Follow User**
- **Endpoint:** `PUT /users/:id/follow`
- **Description:** Follow another user.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "_id": "<your_user_id>"
  }
  ```

---

### **5. Unfollow User**
- **Endpoint:** `PUT /users/:id/unfollow`
- **Description:** Unfollow a user.
- **Headers:**
  ```
  Authorization: Bearer <authToken>
  ```
- **Body:**
  ```json
  {
    "_id": "<your_user_id>"
  }
  ```

---

## 🔑 **How to Use the Token in Postman**

1. Log in via `POST /auth/login` and copy the `authToken` from the response.
2. In Postman, go to the **Authorization** tab.
3. Select **Bearer Token** as the type.
4. Paste the token into the field and send the request.

**When is the Token Required?**  
The token is required for all protected routes (creating posts, updating user data, following users, etc.). For public information (like viewing posts), no token is needed.

