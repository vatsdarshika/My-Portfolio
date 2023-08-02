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
//  START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})