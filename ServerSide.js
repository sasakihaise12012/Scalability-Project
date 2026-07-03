const db_connection = require('./db');
const express = require('Express');
const cors = require('cors');
const app = express();
app.use(cors());
const bcrypt = require('bcrypt'); //for password hashing
app.use(express.json());
const jwt = require("jsonwebtoken");


const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.post("/login", async (req, res) => {

try{

const username = req.body.name;
const password = req.body.pw;

//if the name is not unique here then then extra code will need 
//to be put in case the query outputs more than one row with the sama name

const name_search = await db_connection.query('SELECT * FROM users WHERE username =$1', [username]);

if (name_search.rows.length ==0){

return res.status(401).json({error: "Invalid credentials *username not found through Server logic*",});
}
//console.log("Error source probably?:", name_search);

const user = name_search.rows[0];

const isMatch = await bcrypt.compare(password, user.hashed_password);

if(isMatch == false){

//console.log("isMatch value:", isMatch);

return res.status(401).json({error: 'Invalid credentials while comparing the password'});
console.log("Login failed, unauthorized access!!");

}else{

//cannot send more than one response, there is already one down there response =>res
console.log("Login successful!!");
//console.log("isMatch value:", isMatch);

const id = user.id;
const role_search = await db_connection.query('SELECT * FROM membership WHERE user_id =$1', [id]);

membership= role_search.rows[0]

const payload = {

sub: id,
role: membership.role,

};

const accessToken = jwt.sign(

payload,
process.env.JWT_SECRET,
{
 expiresIn: "15m"
}

);

console.log("membership role:", membership.role);

console.log("JWT token:", accessToken);

res.cookie("Token", accessToken, {

httpOnly: true,
secure: false, //sends to both http and https since this is a local website.
sameSite: "lax", //Medium security prevents some attacks.
maxAge: 60*60*1000 // One hour, calculates from milliseconds hence the "*1000"
}).json({message: "Logged in"});

//you can only send one response for a single request, response => res.
//res.json({success: true}); //makes json success True available in your browser.
//res.json({accessToken});

}

}catch(error){

console.error("error at catch at server logic", error);
res.status(500).json({error: "Login failed"})
}
});

app.post('/register', async (req , res) => {

try{

const username = req.body.name;
const password = req.body.pw;
console.log("name recieved at server side?:", username);

const salt_rounds = 10; //how hard to crack with relevance to how much computational resource it takes the harder it is to crack

const hashedPassword = await bcrypt.hash(password, salt_rounds);
const identification=1;
const result = await db_connection.query("INSERT INTO users (username, hashed_password) VALUES ($1, $2)", [username, hashedPassword]
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
