const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'aromelo'
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

app.get('/admin',
    (req, res) => {
        connection.query(
            'SELECT * FROM scene_aromelo',
            (error, results) => {
                res.render('admin.ejs', { items: results });
                if (error) {
                    console.log(error);
                }
            }
        )
    }
);


app.post('/create',
    (req, res) => {
        console.log(req.body.ans);
        connection.query(
            'INSERT INTO scene_aromelo (scene,aroma,aromasort,music,url,time,mood,other) VALUES(?,?,?,?,?,?,?,?)',
            req.body.ans,
            (error, results) => {
                res.redirect('/admin');
                if (error) {
                    console.log(error);
                }
            }
        )
    }
);

app.post('/delete/:id',
    (req, res) => {
        connection.query('DELETE FROM scene_aromelo WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.redirect('/admin');
                if (error) {
                    console.log(error);
                }
            })
    }
);

app.get('/edit/:id',
    (req, res) => {
        connection.query(
            'SELECT * FROM scene_aromelo  WHERE id = ?',
            [req.params.id],
            (error, results) => {
                console.log(results);
                res.render('edit.ejs', { items: results[0] });
                if (error) {
                    console.log(error);
                }
            }
        )
    }
);

app.post('/update/:id',
    (req, res) => {
        req.body.ans.push(req.params.id);
        connection.query(
            'UPDATE scene_aromelo SET scene = ?, aroma = ?, aromasort = ?, music = ?, url = ?, time = ?, mood = ?, other = ? WHERE id = ?',
            req.body.ans,
            (error, results) => {
                res.redirect('/admin');
                if (error) {
                    console.log(error);
                }
            }
        )
    })

app.listen(3000);