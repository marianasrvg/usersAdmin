let detalle = document.querySelector("#detalle");
let back = document.querySelector("#back");

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

let createUserHTML = (userJson) => {
    let html = 
    `<div class="media col-12 mt-2">
        <div class="media-left align-self-center mr-3">
            <img class="rounded-circle" src="${userJson.url}">
        </div>
        <div class="media-body">
            <h4> ${userJson.nombre} ${userJson.apellido}</h4>
            <p >Correo: ${userJson.correo}</p>
            <p >Contraseña: ${userJson.password}</p>
            <p >Fecha: ${userJson.fecha}</p>
            <p >Sexo: ${userJson.sexo}</p>
            <p >URL: ${userJson.url}</p>
        </div>
    `;
    return html;
}

let loadDetail = () => {
    detalle.innerHTML = "";
    userDetails(localStorage.userDetail, (user) => {
        detalle.innerHTML += createUserHTML(user);
    });
}

if(localStorage.userDetail){
    loadDetail();
}

let backConsultas = (event) => {
    localStorage.removeItem('userDetail');
    window.location.href = "/consulta.html";
}

back.addEventListener("click", backConsultas);
