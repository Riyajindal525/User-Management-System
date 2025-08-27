const { faker } = require('@faker-js/faker'); 
const mysql = require("mysql2"); 
const express = require("express"); 
const path = require("path"); 
const methodOverride = require("method-override"); 

const app = express(); 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 

const connection = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root', 
  database: 'demo', 
  password: 'Riya@12345' 
}); 

connection.connect(err => { 
  if (err) throw err; 
  console.log(" MySQL Connected"); 
}); 

// Generate 100 random users 
// function randomUser(){ 
// return[ 
// faker.internet.username(), 
// faker.internet.email(), 
// faker.internet.password(), 
// faker.number.int({ min: 18, max: 60 }), 
// new Date() // created_at 
// ] 
// }; 

// let data = []; 
// for (let i = 0; i < 100; i++) { 
// data.push(randomUser()); 
// } 

// Bulk insert query 
// let q = "INSERT INTO users (username, email, password, age, created_at) VALUES ?"; 
// connection.query(q, [data], (err, result) => { 
// if (err) console.log(" Error inserting:", err); 
// else console.log("✅ Rows inserted:", result.affectedRows); 
// connection.end(); 
// }); 

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

app.get("/", (req, res) => { 
  const q = "SELECT COUNT(*) AS count FROM users"; 
  connection.query(q, (err, result) => { 
    if (err) return res.status(500).send("Database Error"); 
    console.log("Total users in DB:", result[0].count); 
    const count = result[0].count; 
    res.render("home.ejs", { count }); 
  }); 
}); 

app.get("/users", (req, res) => { 
  const q = "SELECT id, username, email, password FROM users"; 
  connection.query(q, (err, result) => { 
    if (err) return res.status(500).send("Database Error"); 
    const users = result; 
    res.render("show.ejs", { users }); 
  }); 
}); 

app.get("/users/:id/edit", (req, res) => { 
  const { id } = req.params; 
  const q = "SELECT * FROM users WHERE id = ?"; 
  connection.query(q, [id], (err, result) => { 
    if (err) return res.status(500).send("Database Error"); 
    if (result.length === 0) return res.status(404).send("User not found"); 
    const user = result[0]; 
    res.render("edit.ejs", { user }); 
  }); 
}); 

// Start server 
app.listen(8080, () => { 
  console.log("Server running at http://localhost:8080"); 
}); 

app.patch("/users/:id", (req, res) => { 
  const { id } = req.params; 
  const { username, password } = req.body; 

  try { 
    let userq = `SELECT * FROM users WHERE id = '${id}'`;   
    connection.query(userq, (err, result) => { 
      if (err) throw err; 

      if (result.length === 0) {
        return res.send("User not found!");
      }

      const user = result[0]; 
      if (password === user.password) { 
        let updateq = `UPDATE users SET username = '${username}' WHERE password = '${user.password}'`; 
        connection.query(updateq, (err, results) => { 
          if (err) throw err; 
          res.redirect("/users"); 
        }); 
      } else { 
        res.send("INCORRECT PASSWORD"); 
      } 
    }); 
  } catch (err) { 
    console.log("ERROR 404", err); 
    res.status(500).send("Some error occurred!");
  } 
}); 

app.get("/user", (req, res) => { 
  res.render("new.ejs"); 
}); 

app.post("/user", (req, res) => { 
  let { username, password, email, age } = req.body; 
  console.log(`New username : ${username} | Password : ${password} | Email : ${email} | Age : ${age}`); 
  let q = "INSERT INTO users (username, email, password, age, created_at) VALUES (?, ?, ?, ?, NOW())"; 
  try { 
    connection.query(q, [username, email, password, age], (err, result) => { 
      if (err) throw err; 
      console.log("✅ User Inserted:", result.affectedRows); 
      res.redirect("/"); 
    }); 
  } catch (err) { 
    console.log("ERROR 4040", err); 
    res.send("Some error occurred!"); 
  } 
}); 

app.delete("/user", (req, res) => { 
  res.render("delete.ejs"); 
}); 

app.post("/user/delete/", (req, res) => { 
  let { username, password, email } = req.body; 
  let userq = `SELECT * FROM users WHERE username = '${username}'`; 
  
  try { 
    connection.query(userq, (err, result) => { 
      if (err) throw err;

      if (result.length === 0) { 
        return res.send("This user does not exist. Please enter a valid username and email!"); 
      } 

      const user = result[0]; 
      console.log(user); 

      if (user.password === password && user.email === email) { 
        let deleteq = "DELETE FROM users WHERE username = ? AND email = ? AND password = ?"; 
        connection.query(deleteq, [username, email, password], (err2, result2) => { 
          if (err2) throw err2;   
          
          console.log("User Deleted:", result2.affectedRows); 
          res.send("User deleted successfully!"); 
        }); 
      } else { 
        res.send("Incorrect email or password for this username!"); 
      } 
    }); 
  } catch (err) { 
    console.log("ERROR 404", err);
    res.send("ERROR 404"); 
  } 
}); 
