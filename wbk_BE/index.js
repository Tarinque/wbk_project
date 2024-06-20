const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');

app.use(cors()); // Menambahkan middleware CORS
app.use(express.json()); // Untuk parsing aplikasi/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    response(200, "API WBK V1 Ready to Go!", "SUCCESS", res)
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return response(500, "Database query error", "ERROR", res);
        }
        console.log('Data fetched from database:', results);
        response(200, results, "GET Data Users", res);
    });
});

app.get('/users/:id_user', (req, res) => {
    const id_user = req.params.id_user;
    const sql = `SELECT * FROM users WHERE id_user = ${id_user}`;
    db.query(sql, (err, results) => {
        if (err) {
            return response(500, err, "Error fetching user data", res);
        }
        if (results.length > 0) {
            return response(200, results, "Get Data by ID", res);
        } else {
            return response(404, "User not found", "Error", res);
        }
    });
});

app.post('/users', (req, res) => {
    const { id_user, username, firstname, satker, roles } = req.body
    const sql = `INSERT INTO users (id_user, username, firstname, satker, roles) VALUES ('${id_user}', '${username}', '${firstname}', '${satker}', '${roles}')`
    db.query(sql, (err, results) => {
        if (err) response(500, "Invalid Data", "ERROR", res)
        if (results?.affectedRows) {
            const data = {
                isSuccess: results.affectedRows,
                id: results.insertId
            }
            response(200, data, "Insert Data Successfully", res)
        }
    })
})

app.put('/users', (req, res) => {
    const { paramid_user, id_user, username, firstname, satker, roles } = req.body
    const sql = `UPDATE users SET id_user = '${id_user}', username = '${username}', firstname = '${firstname}', satker = '${satker}', roles = '${roles}' WHERE id_user = ${paramid_user}`
    db.query(sql, (err, results) => {
        if (err) response(500, "Invalid Data", "ERROR", res)
        if (results?.affectedRows) {
            const data = {
                isSuccess: results.affectedRows,
                message: results.message
            }
            response(200, data, "Data Updated Successfully", res)
        } else {
            response(404, "Username Not Found", "ERROR", res)
        }
    })
})

app.delete('/users', (req, res) => {
    const { id_user } = req.body
    const sql = `DELETE FROM users WHERE id_user = ${id_user}`
    db.query(sql, (err, results) => {
        if (err) response(500, "Invalid Data", "ERROR", res)
        if (results?.affectedRows) {
            const data = {
                isDeleted: results.affectedRows
            }
            response (200, data, "Data Deleted Successfully", res)
        } else {
            response(404, "Username Not Found", "ERROR", res)
        }
    })
})

// app.post('/login', (req, res) => {
//     console.log({ requestFromOutside: req.body })
//     res.send('Login berhasil!')
// })

// app.put('/editusername', (req, res) => {
//     console.log({ UpdateUsername: req.body })
//     res.send('Update berhasil!')
// })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})