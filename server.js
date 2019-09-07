const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var jwt = require('jwt-simple');

app.listen(4000);

/*

MYSQL DATABASE

*/ 

const dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    server: process.env.SERVER,
    database: process.env.DATABASE
}

const connection = mysql.createConnection(dbConfig);

// connection.execute(`
//     SELECT name FROM users WHERE id = ? AND dob = ?
// `, [query.id])

connection.connect(function(err){
    if (err){
        return console.error(err.message);
    }

    connection.query(createUsers, function(err, results, fields){
        if (err){
            console.log(err.message);
        }
    });

    connection.end(function(err){
        if (err){
            return console.log(err.message)
        }
    });
});


/*

USER API

*/

function createUser(req, res, next) {
    return true;
}

app.post('/api/users', (req, res, next) => {
    if (createUser) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

      

        res.sendStatus(201);

        // next();
    }
    else{
        res.sendStatus(403);
    }
})

var key;

app.post('/api/users/login', (req, res, next) => {
    const payload = req.body;
    const key = 'abcd';

    /* DB code to get id */

    const db = {
        "id": 1
    }

    const token = jwt.encode(db, key);

    res.json({
        "token": token
    })
})

/*

MIDDLEWARE

*/

function isLoggedIn(req, res, next) {
    var receivedToken = req.headers.authorization; //probably gonna change but whatever
    var decodedToken = jwt.decode(receivedToken, key)
    req.user = decodedToken;

    /*assuming we have some code here to make sure their token is legit*/

    next(); //prob under a if statement, else return false? 
}

/*

BOOKS API

*/

const bookInfo;

app.get('/api/books', (req, res, next) => {
    var user = req.user;

    /* gets user's books from DB. Hard coded for now */
    var books = [
        {
            "id": 1,
            "name": "My book",
            "color": "green",
            "text": "abcd"
        },
        {
            "id": 2,
            "name": "My book",
            "color": "red",
            "text": "efgh"
        }
    ]

    res.json(books)
})

app.post('/api/books', isLoggedIn, (req, res, next) => {
    if (isLoggedIn) {
        bookInfo = req.body;

        res.sendStatus(201);
        
        next();
    }
    else {
        res.sendStatus(403); //if they're not logged in from us do we jus yeet them back to landing?
    }
})

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



