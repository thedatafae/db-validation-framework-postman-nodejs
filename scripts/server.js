const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 1. Connect to your Local MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: '8899', // Your MySQL password
    database: 'sqa_testing'
});

// 2. The "Bridge" Endpoint
app.post('/query', (req, res) => {
    const sqlQuery = req.body.query;
    db.query(sqlQuery, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(3000, () => console.log('🚀 DB Bridge running on http://localhost:3000'));