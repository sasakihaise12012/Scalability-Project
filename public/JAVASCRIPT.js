
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

console.log("response after trying to log in", response);

if(response.ok){

document.getElementById("website-content").style.display = "block";

document.getElementById("login-screen").style.display = "none";

}

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



async function enter_task(){

const project_id = document.getElementById("project_id").value;
const task = document.getElementById("title").value;
const description = document.getElementById("Description").value;
const task_status = document.getElementById("status").value;
const user_responsible_id = document.getElementById("user_responsible_id").value;

const body_sent = {

proj_id : project_id,
task_name: task,
desc: description,
status: task_status,
assigned_user_id: user_responsible_id

}


try{

const response = await fetch(`http://localhost:3000/tasks`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

}catch(error){

console.log("Error at javascript regarding function enter_task() function", error);

}


}


async function new_project(){

const project_name = document.getElementById("new_project").value;

const body_sent = {

proj_name: project_name,

}

try{

const response = await fetch(`http://localhost:3000/newProjects`,{

method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(body_sent)
});

}catch(error){

console.log("Error at javascript regarding function new_project() function", error);

}

}

async function get_projects(){

const response = await fetch('http://localhost:3000/getProjects');

const data = await response.json();

console.log(data);
console.log(typeof data);
console.log(Array.isArray(data));


document.getElementById("projects-container").style.display = "block";
const dataContainer = document.getElementById("projects-container");

dataContainer.innerHTML = "";

data.forEach(project => {

const element = document.createElement('p');
element.textContent =project;

dataContainer.appendChild(element);
});
}

async function logout(){

const response =  await fetch(`http://localhost:3000/logout`,{

method: "POST",

});

//show login screen
document.getElementById("login-screen").style.display = "block";

// hide everything else
document.getElementById("website-content").style.display = "none";

}



