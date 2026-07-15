const db_connection = require('./db');
const express = require('Express');
const cors = require('cors');
const app = express();
app.use(cors());
const bcrypt = require('bcrypt'); //for password hashing
app.use(express.json());
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//call this function at each request to perform any action before the whole function that does that 
//not before every action but before every function that does any action because if before every action
//its too much work for the servers of the website.

const confirm_auth = (req, res, next) =>{

console.log("JWT Token recieved from the frontend to the ServerSide: ", req.cookies.Token);
const token = req.cookies.Token;

if(token == undefined){

return res.status(401).send("Not authenticated");

}

try{
	//this contains the payload of the token
	const payload = jwt.verify(token, process.env.JWT_SECRET);
	console.log("result of the verification: ", payload);
	next();
	
}catch(err){

return res.status(401).send("Invalid token");

}

}

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

app.post('/register' , async (req , res) => {

try{

const username = req.body.name;
const password = req.body.pw;
const role = req.body.role;
const org = req.body.org;

console.log("name recieved at server side?:", username);

const salt_rounds = 10; //how hard to crack with relevance to how much computational resource it takes the harder it is to crack

const hashedPassword = await bcrypt.hash(password, salt_rounds);
const identification=1;
const result = await db_connection.query("INSERT INTO users (username, hashed_password) VALUES ($1, $2)", [username, hashedPassword]
);

//Getting the user's id for the membership's table

const user_id = await db_connection.query('SELECT id FROM users WHERE username =$1 AND hashed_password= $2', [username, hashedPassword]);

const user = BigInt(user_id.rows[0].id);

//end of getting the user's id for the membership's table
//Getting org_id from organization the user belongs to.

const organization_id = await db_connection.query("SELECT id FROM organization WHERE username = $1", [org]);

console.log("Namco org id:", organization_id.rows[0]);
const org_id = BigInt(organization_id.rows[0].id);

const membership_input = await db_connection.query("INSERT INTO membership (org_id, user_id, role) VALUES ($1, $2, $3)", [org_id, user, role]);

res.json({
     message: "User created! wohoow!",
     user: result.rows[0]
     
});

const name_search = await db_connection.query('SELECT * FROM users WHERE username =$1', [username]);
const registered_user = name_search.rows[0];
const id = registered_user.id;

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

} catch(error){


console.error("Error at server logic at", error);
res.status(500).json({error: 'Damn!! at server logic registration failed.'});
//res.status(500).json({error: 'server error'});
}

});

app.post('/org', async (req , res) => {

try{

const role = req.body.role;

console.log("name recieved at server side?:", username);

const result = await db_connection.query("INSERT INTO organization (username) VALUES ($1)", [username]);


res.json({
     message: "new organization has entered the system!",
     user: result.rows[0]});

} catch(error){


console.error("Error at server logic at", error);
res.status(500).json({error: 'Damn!! at server logic organization failed.'});
//res.status(500).json({error: 'server error'});
}

});


app.post("/newProjects", confirm_auth, async (req, res) =>{

//console.log("Hello inside project serverSide 0");

try{

//console.log("Hello inside project serverSide 1");
const proj_name = req.body.proj_name;
const org_id = req.body.org_id;


const result = await db_connection.query('INSERT INTO projects (org_id, name) VALUES ($1, $2)', [org_id ,proj_name]);

res.json({
     message: "new Project has entered the system!",
     user: result.rows[0]});

//console.log("Hello inside project serverSide 3");

}catch(err){

res.status(500).json({error: 'Damn!! at server logic newProjects section failed.'});

}

});


//confirm_auth is a function below
app.post("/tasks", confirm_auth, async (req, res) => { 


try{

const proj_id = req.body.proj_id;
const task_name = req.body.task_name;
const task_desc= req.body.desc;
const status = req.body.status;
const assigned_user_id = req.body.assigned_user_id;

const membership = await db_connection.query('SELECT org_id from membership WHERE user_id = $1', [assigned_user_id]);

const org_id = membership.rows[0].org_id;

//next step is adding the project.
//loop on the project names since no two projects should have the same name. also differentiate
//this is an existing project, creating a new project is elsewhere.

const task_creation = await db_connection.query('INSERT INTO tasks (project_id, title, description, status, assigned_user_id) VALUES ($1, $2, $3, $4, $5)', 
[proj_id, task_name, task_desc, status, assigned_user_id]);

}catch(err){

res.status(500).json({error: 'Damn!! at server logic organization failed.'});

}


});






app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');

});
