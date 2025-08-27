# User Management System (Node.js + Express + MySQL)

A simple full-stack project built with **Node.js, Express, EJS, and MySQL** that demonstrates how to manage users dynamically.  
You can create, read, update, and delete users, with proper database integration and clean UI using EJS templates.

---

## 🚀 Features
- Add new users with unique IDs.
- View all users in a clean table format.
- Edit existing user details.
- Delete users from the database.
- Secure password handling.
- Simple and clean EJS frontend.

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Frontend**: EJS (Embedded JavaScript Templates)  
- **Database**: MySQL  
- **Other**: Faker.js (for dummy data)

---

## 📚 What I Learned
- How to connect **Node.js with MySQL** using `mysql2`.  
- Writing **SQL queries** for CRUD operations (Create, Read, Update, Delete).  
- Using **Express.js routing** (`GET`, `POST`, `PATCH`, `DELETE`).  
- Implementing **EJS templates** for dynamic frontend rendering.  
- Handling **form data** with `express.urlencoded()`.  
- Using **method-override** to support PUT/PATCH/DELETE requests in forms.  
- Error handling using **try-catch** and MySQL callbacks.  
- Validating user input before updating/deleting data.  

---

## ⚡ Steps to Run the Project

1. **Clone the repository**  
   
   git clone https://github.com/username/repo-name.git

2.**Move into the project folder**
   cd repo-name
 
 3.**Install dependencies**
   npm install

4.**Start the server**
  node index.js

5. Now open http://localhost:8080
 in your browser.


## 🗄️ Database Setup

- Create a MySQL database using CLI or any MySQL client.  
- Run the provided `schema.sql` file to create required tables and structure.  
- The project is ready to connect with the database after this.
