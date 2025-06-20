const mysql = require('mysql');

const servername = "localhost"; 
const username = "root"; 
const password = "";
const database = "geeksforgeeks";

// Create a connection 
const conn = mysql.createConnection({
    host: servername,
    user: username,
    password: password,
    database: database
});

// Code written below is a step taken
// to check that our Database is 
// connected properly or not. If our 
// Database is properly connected we
// can remove this part from the code 
// or we can simply make it a comment 
// for future reference.

conn.connect((err) => {
    if (err) {
        console.error("Error: " + err.stack);
        return;
    }
    console.log("success");
});

let showAlert = false; 
let showError = false; 
let exists = false;

if (window.location.pathname === "/your-post-endpoint" && window.XMLHttpRequest) {
    // Include file which makes the Database Connection.
    // Assuming you have a function to connect to your database

    const username = document.querySelector("input[name='username']").value; 
    const password = document.querySelector("input[name='password']").value; 
    const cpassword = document.querySelector("input[name='cpassword']").value;

    const sql = `SELECT * FROM users WHERE username='${username}'`;

    // Assuming you have a function to execute SQL queries
    executeQuery(sql).then(result => {
        const num = result.length; 

        // This sql query is used to check if the username is already present 
        // or not in our Database
        if (num === 0) {
            if (password === cpassword && !exists) {
                const hash = await bcrypt.hash(password, 10); // Password Hashing

                const insertSql = `INSERT INTO users (username, password, date) VALUES ('${username}', '${hash}', CURRENT_TIMESTAMP)`;

                const insertResult = await executeQuery(insertSql);

                if (insertResult) {
                    showAlert = true; 
                }
            } else { 
                showError = "Passwords do not match"; 
            }      
        } // end if 

        if (num > 0) {
            exists = "Username not available"; 
        } 
    }); // end of executeQuery
} // end if

