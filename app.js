const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'list_app'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack());
        return;
    }
    console.log('success');
})

app.get(
    '/',
    (req, res) => {
        connection.query(
            'SELECT * FROM users',
            (error, results) => {
                console.log(results);
                res.render('top.ejs');
            }
        )

    }
);

app.listen(3000);