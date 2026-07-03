
async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

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

const username = document.getElementById("new_username").value;
const password = document.getElementById("new_password").value;

const body_sent = {

name: username,
pw: password

};
console.log("name recieved at JAVASCRIPT side?:", username);
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