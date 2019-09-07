const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

app.listen(4000);

/*

MYSQL DATABASE

*/ 

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
}

let connection;

const connect = async () => {
    connection = await mysql.createConnection(dbConfig)
}
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

app.post('/api/users', async (req, res, next) => {

    console.log(req.body)

    const email = req.body.email;
    const password = req.body.password;

    const saltRounds = 10;

    //check if email already exists same way as login

    bcrypt.hash(password, saltRounds, async function(err, hash) {
        // Store hash in your password DB.

        console.log(err)
        console.log(hash)

        const [response] = await connection.execute(`
            INSERT INTO users(email, hash) VALUES (?, ?)
        `, [email, hash])

        res.sendStatus(201);
        });
})

const key = 'abcd';

app.post('/api/users/login', async (req, res, next) => {

    const [rows] = await connection.execute(`
        SELECT id, hash FROM users WHERE email = ?
    `, [req.body.email])

    if (rows.length == 0){
        res.sendStatus(404)
    }

    //check password
    const match = await bcrypt.compare(req.body.password, rows[0].hash);
    
    if(match) {

        //login
        const db = {
            "id": rows[0].id
        };

        const token = jwt.encode(db, key);
    
        res.json({
            "token": token
        });
    }
    
    else{
        res.sendStatus(404)
    }

})

/*

MIDDLEWARE

*/

function isLoggedIn(req, res, next) {
    var receivedToken = req.headers.authorization.split("Bearer ")[1]; //probably gonna change but whatever
    var decodedToken = jwt.decode(receivedToken, key)
    req.user = decodedToken;

    /*assuming we have some code here to make sure their token is legit*/

    next(); //prob under a if statement, else return false? 
}

/*

BOOKS API

*/



app.get('/api/books', isLoggedIn, async (req, res, next) => {

    /* gets user's books from DB. */

    const [rows] = await connection.execute(`
        SELECT id, color, name, content FROM books WHERE userID = ?
    `, [req.user.id])

    console.log(rows)

    res.json(rows)
})

app.post('/api/books', isLoggedIn, (req, res, next) => {
    if (isLoggedIn) {
        const bookInfo = req.body;

        res.sendStatus(201);
        
        next();
    }
    else {
        res.sendStatus(403); //if they're not logged in from us do we jus yeet them back to landing?
    }
});

app.get('/api/book/:id', isLoggedIn, (req, res) => {
    res.json({
        id: 1,
        color: "#F7FEE7",
        name: "John's Dream Journal",
        content: "I had a good dream."
    })
});

app.put('/api/books/:id', isLoggedIn, (req, res, next) => {
    if (isLoggedIn) {
        bookInfo = req.body;

        res.sendStatus(200);

        next();
    }
    else{
        res.sendStatus(403);
    }
})



