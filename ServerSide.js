const db_connection = require('./db');
const express = require('Express');
const app = express();
const bcrypt = require('bcrypt'); //for password hashing
app.use(express.json());



app.post('/register', async (req , res) => {

try{

const username = req.body.name;
const password = req.body.pw;
console.log("name recieved at server side?:", username);

const salt_rounds = 10; //how hard to crack with relevance to how much computational resource it takes the harder it is to crack

const hashedPassword = await bcrypt.hash(password, salt_rounds);
const identification=1;
const result = await db_connection.query("INSERT INTO accounts (name, pw) VALUES ($1, $2)", [username, hashedPassword]
);

res.json({
     message: "User created! wohoow!",
     user: result.rows[0]});

} catch(error){


console.error("Error at server logic at", error);
res.status(500).json({error: 'Damn!! at server logic registration failed.'});
//res.status(500).json({error: 'server error'});
}

});



app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');

});
