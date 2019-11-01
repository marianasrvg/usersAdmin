
let usersList = document.querySelector("#lista");

let loadUsers = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users');
    xhr.setRequestHeader("x-auth", localStorage.token);
    xhr.setRequestHeader("x-user-token", localStorage.userToken);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            usersList.innerHTML = "";
            let res = JSON.parse(xhr.response);
            res = res.map((item) => {
                return createUserHTML(item);
            });
            usersList.innerHTML = res;
        }else {
            alert(xhr.response);   
        }
    }
}

let createUserHTML = (userJson) => {
    let html = 
    `<div class="media col-8 mt-2">
        <div class="media-left align-self-center mr-3">
            <img class="rounded-circle" src="${userJson.url}">
        </div>
        <div class="media-body">
            <h4> ${userJson.nombre} ${userJson.apellido}</h4>
            <p >Correo: ${userJson.correo}</p>
        </div>
        <div class="media-right align-self-center">
                <div class="row">
                    <a href="#" onclick="detailUser('${userJson.correo}')" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></a>
                </div>
                <div class="row">
                    <a href="#" onclick="editUser('${userJson.correo}')" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  "></i></a>
                </div>
                <div class="row">
                    <a href="#" onclick="deleteUser('${userJson.correo}')" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove "></i></i></a>
                </div>
            </div>
        </div>
    `;
    return html;
}

let detailUser = (correo) => {
    localStorage.userDetail = correo;
    window.location.href = "/detalle.html";
}

let userDetails = (correo, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://users-dasw.herokuapp.com/api/users/${correo}`);
    xhr.setRequestHeader("x-auth", localStorage.token);
    xhr.setRequestHeader("x-user-token", localStorage.userToken);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            //console.log(xhr.response);
            cb(JSON.parse(xhr.response));
        }else {
            alert(xhr.response);   
        }
    }
}


let btn_save = document.querySelector("#save");
let name = document.querySelector("#name-form");
let email = document.querySelector("#email-form");
let psw = document.querySelector("#psw");
let conf_psw = document.querySelector("#conf_psw");
let lname = document.querySelector("#lname-form");
let image = document.querySelector("#image-form");
let date = document.querySelector("#date-form");


let editUser = (correo) => {
    console.log(`edita a ${correo}`);
    userDetails(correo, (user) => {
        name.value = user.nombre;
        lname.value = user.apellido;
        psw.value = user.password;
        conf_psw.value = user.password;
        email.value = user.correo;
        date.value = user.fecha;
        image.value = user.url;
        $("#actualizar").modal("show");
    });
    
}

let actualizar = (event) => {
    let xhr = new XMLHttpRequest();

    let user = {
        nombre:name.value,
        apellido:lname.value,
        password:psw.value,
        url:image.value,
        fecha:date.value
    }

    xhr.open('PUT', `https://users-dasw.herokuapp.com/api/users/${email.value}`);
    xhr.setRequestHeader("x-auth", localStorage.token);
    xhr.setRequestHeader("x-user-token", localStorage.userToken);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        // console.log(xhr.status);
        // console.log(xhr.response);
        if(xhr.status == 200){
            alert('Usuario modificado');
            $("#actualizar").modal("hide");
            loadUsers();
        }else{
            alert(xhr.responseText);
        }
    }  
}

btn_save.addEventListener("click", actualizar);

let btn_erase = document.querySelector("#erase");
let ename = document.querySelector("#ename-form");
let eemail = document.querySelector("#eemail-form");
let elname = document.querySelector("#elname-form");
let eimage = document.querySelector("#eimage-form");
let edate = document.querySelector("#edate-form");

let deleteUser = (correo) => {
    console.log(`elimina a ${correo}`);
    userDetails(correo, (user) => {
        ename.value = user.nombre;
        elname.value = user.apellido;
        eemail.value = user.correo;
        edate.value = user.fecha;
        eimage.value = user.url;
        $("#eliminar").modal("show");
    });
};


let eliminar = (event) => {

    let confirmado = confirm(`Deseas eliminar el usuario ${eemail.value}`);
    if(confirmado){
        let xhr = new XMLHttpRequest();

        xhr.open('DELETE', `https://users-dasw.herokuapp.com/api/users/${eemail.value}`);
        xhr.setRequestHeader("x-auth", localStorage.token);
        xhr.setRequestHeader("x-user-token", localStorage.userToken);
        xhr.setRequestHeader("Content-Type", 'application/json');
        xhr.send();
        xhr.onload = () => {
            // console.log(xhr.status);
            // console.log(xhr.response);
            if(xhr.status == 200){
                alert('Usuario eliminado');
                $("#eliminar").modal("hide");
                loadUsers();
            }else{
                alert(xhr.responseText);
            }
        }
    }else {
        $("#eliminar").modal("hide");
    }
};

btn_erase.addEventListener("click", eliminar);

if(localStorage.userToken){
    loadUsers();
}

