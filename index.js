const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'bytelife',
	password: process.env.PASSWORD,
	port: 5432
});

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get("/leaderboard", (req, res) => {
	pool.query("SELECT * FROM main.leaderboard", (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	})
})
app.post("/leaderboard", (req, res) => {
	const {id, maxAge, maxRep, nickname} = req.body;
	
	pool.query("INSERT INTO main.leaderboard (id, maxAge, maxRep, nickname) VALUES ($1, $2, $3, $4)", [id, maxAge, maxRep, nickname], (err, results) => {
		if (err) throw err;
		res.status(200).send("Record added successfully!");
	})
})

app.listen(port, () => {
	console.log("Listening on port 3000");
});
