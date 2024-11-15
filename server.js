const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    console.log("working");
    return res.status(200)
})

// MySQL Connection


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "3ac594GLA$",
    database: "contactdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const db = pool.promise();
module.exports = db;


db.query("SELECT 1").then(() => console.log("Database connected successfully")).catch(console.error);




const contactRoutes = require("./routes/contacts");
app.use("/api/contacts", contactRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));