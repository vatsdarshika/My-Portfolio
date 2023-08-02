const express = require("express");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
// For serving the static file - CSS
app.use('/assets', express.static('assets'));
// For serving the static file - Images
app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("Home");
});

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database configuration
const db = mysql.createConnection({
  host: "your_mysql_host",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "your_mysql_database",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database...");
  }
});

// API endpoint to handle form submissions
app.post("/submitForm", (req, res) => {
  const { myName, myEmail, textarea } = req.body;

  // Insert form data into the MySQL database
  const sql = "INSERT INTO contact_forms (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [myName, myEmail, textarea], (err, result) => {
    if (err) {
      console.error("Error saving data to database: ", err);
      return res.status(500).json({ message: "Error saving data." });
    }
    console.log("Form data saved to database.");
    return res.status(200).json({ message: "Form data saved successfully." });
  });
});

//  START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})