const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/frontend/build`));

var jwt = require("jwt-simple");
var bcrypt = require("bcrypt");

app.listen(process.env.PORT);

/*

MYSQL DATABASE

*/

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
};

let connection;

const connect = async () => {
  connection = await mysql.createConnection(dbConfig);
};
connect();

// connection.connect(function(err){
//     if (err){
//         return console.error(err.message);
//     }

//     connection.query(createUsers, function(err, results, fields){
//         if (err){
//             console.log(err.message);
//         }
//     });

//     connection.end(function(err){
//         if (err){
//             return console.log(err.message)
//         }
//     });
// });

/*

USER API

*/

function createUser(req, res, next) {
  next();
}

app.post("/api/users", async (req, res, next) => {
  const { email, password } = req.body;

  const [rows] = await connection.execute(
    `
        SELECT 
            id 
        FROM 
            users 
        WHERE 
            email = ?
    `,
    [email]
  );

  if (rows.length > 0) {
    res.sendStatus(409);
  }

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    // Store hash in your password DB.

    const [response] = await connection.execute(
      `
            INSERT INTO 
                users(email, hash) 
            VALUES 
                (?, ?)
        `,
      [email, hash]
    );

    res.sendStatus(201);
  });
});

app.post("/api/users/login", async (req, res, next) => {
  const { email, password } = req.body;

  const [rows] = await connection.execute(
    `
        SELECT 
            id, 
            hash 
        FROM 
            users 
        WHERE 
            email = ?
    `,
    [email]
  );

  if (rows.length == 0) {
    res.sendStatus(404);
  }

  //check password
  const match = await bcrypt.compare(password, rows[0].hash);

  if (match) {
    //login
    const db = {
      id: rows[0].id
    };

    const token = jwt.encode(db, process.env.JWT_SECRET);

    res.json({
      token: token
    });
  } else {
    res.sendStatus(404);
  }
});

/*

MIDDLEWARE

*/

function isLoggedIn(req, res, next) {
  var receivedToken = req.headers.authorization.split("Bearer ")[1]; //probably gonna change but whatever
  var decodedToken = jwt.decode(receivedToken, key);
  req.user = decodedToken;

  /*assuming we have some code here to make sure their token is legit*/

  next(); //prob under a if statement, else return false?
}

/*

BOOKS API

*/

app.get("/api/books", isLoggedIn, async (req, res, next) => {
  /* gets user's books from DB. */

  const [rows] = await connection.execute(
    `
        SELECT 
            id, 
            color, 
            name, 
            content 
        FROM 
            books 
        WHERE 
            userID = ?
    `,
    [req.user.id]
  );

  res.json(rows);
});

app.post("/api/books", isLoggedIn, async (req, res, next) => {
  const { color, name, content = "" } = req.body;

  const [response] = await connection.execute(
    `
        INSERT INTO 
            books(userID, color, name, content) 
        VALUES 
            (?, ?, ?, ?)
    `,
    [req.user.id, color, name, content]
  );

  res.sendStatus(201);
});

app.get("/api/books/:id", isLoggedIn, async (req, res) => {
  const [rows] = await connection.execute(
    `
        SELECT 
            id, 
            userID, 
            color, 
            name, 
            content 
        FROM 
            books 
        WHERE 
            id = ? AND 
            userID = ?
    `,
    [req.params.id, req.user.id]
  );

  res.json(rows[0]);
});

app.put("/api/books/:id", isLoggedIn, async (req, res, next) => {
  const { content = "", name, color } = req.body;

  const [response] = await connection.execute(
    `
        UPDATE 
            books 
        SET 
            content = ?,
            name = ?,
            color = ?
        WHERE 
            id = ? AND 
            userID = ?
    `,
    [content, name, color, req.params.id, req.user.id]
  );

  res.sendStatus(200);
});

app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/frontend/build/index.html`);
});
