
async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if (username == "" || password == ""){

console.log("cannot allow an empty input here");
return;

}

const body_sent = {

name: username,
pw: password

};

try{

const response = await fetch(`http://localhost:3000/login`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

const data = await response.json();



}catch(error){

console.log("Error at javascript regarding login", error);

}
}


async function register(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const user_role = document.getElementById("role").value;
const organization = document.getElementById("org").value;

const body_sent = {

name: username,
pw: password,
role: user_role,
org: organization

};


console.log("Here is the username from Javascript:", username);
console.log("Here is the password from Javascript:", password);
console.log("Here is the role from Javascript:", user_role);
console.log("Here is the organization the user belongs to:", organization);

if (username == "" || password == "" || user_role == "" || organization == ""){

console.log("cannot allow an empty input here");
return;

}


console.log("organization recieved at JAVASCRIPT side?:", organization);
try{

const response = await fetch(`http://localhost:3000/register`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

}catch(error){

console.log("Error at javascript regarding registration", error);

}
}

async function create_org(){

const username = document.getElementById("username").value;

if (username == ""){

console.log("cannot allow an empty input here");
return;

}

const body_sent = {

name: username

};
console.log("org recieved at JAVASCRIPT side?:", username);
try{

const response = await fetch(`http://localhost:3000/org`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

}catch(error){

console.log("Error at javascript regarding organization", error);

}

}