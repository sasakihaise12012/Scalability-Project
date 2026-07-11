
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



async function enter_projects_or_tasks(){

const project_name = document.getElementById("name").value;
const task = document.getElementById("title").value;
const description = document.getElementById("Description").value;
const task_status = document.getElementById("status").value;
const user_responsible_id = document.getElementById("user_responsible_id").value;

const body_sent = {

proj_name = project_name,
task_name= task,
desc = description,
status= task_status,
assigned_user_id= user_responsible_id

}


try{

const response = await fetch(`http://localhost:3000/projectsTasks`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

}catch(error){

console.log("Error at javascript regarding function enter_projects_or_tasks()", error);

}


}