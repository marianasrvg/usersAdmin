localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzAyNzgyIiwiaWF0IjoxNTcxOTM1MDM0fQ.UvGG9XU5-ef9LjIaplRd1QlwejyBOU7JYnx24O1RK70";



let btn_save = document.querySelector("#save");
let form_signup = document.querySelector("#sign-up-form");
let psw = document.querySelector("#psw");
let conf_psw = document.querySelector("#conf_psw");

let checkSingUp = () => {
    let e_invalidos = document.querySelectorAll("#sign-up-modal input:invalid");
    if(e_invalidos.length == 0){

        if(psw.value == conf_psw.value){
            // console.log(`${psw} contrasenas iguales ${conf_psw}`);
            btn_save.disabled = false;
        }
    } else {
        btn_save.disabled = true;
    }
    // console.log(e_invalidos);
}

form_signup.addEventListener("change", checkSingUp);

let name = document.querySelector("#name-form");
let lname = document.querySelector("#lname-form");
let email = document.querySelector("#email-form");
let sexo = document.querySelector("#rd-form input:checked");
let image = document.querySelector("#image-form");
let date = document.querySelector("#date-form");

let signUp = (event) => {
    event.preventDefault();
    let xhr = new XMLHttpRequest();

    let new_user = {
        nombre:name.value,
        apellido:lname.value,
        correo:email.value,
        password:psw.value,
        url:image.value,
        sexo:sexo.value,
        fecha:date.value
    }

    // console.log(new_user);
    console.log(JSON.stringify(new_user));

    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/users');
    xhr.setRequestHeader("x-auth", localStorage.token);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send(JSON.stringify(new_user));
    xhr.onload = () => {
        // console.log(xhr.status);
        // console.log(xhr.response);
        if(xhr.status == 201){
            alert('Usuario creado');
            $("#registro").modal('hide');
        }else{
            alert(xhr.response);
        }
    }
}

btn_save.addEventListener("click", signUp);

let btn_login = document.querySelector("#login");

let login = (event) => {
    event.preventDefault();
    let correo = document.querySelector("#modelId input:nth-of-type(1)");
    let contra = document.querySelector(`#modelId input[type="password"]`);
    // console.log(correo.value);
    // console.log(contra.value);

    let xhr = new XMLHttpRequest();

    let new_login = {
        correo:correo.value,
        password:contra.value
    }
    //console.log(JSON.stringify(new_login));
    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/login');
    xhr.setRequestHeader("x-auth", localStorage.token);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send(JSON.stringify(new_login));
    xhr.onload = () => {
        if(xhr.status != 200){
            alert(xhr.response);
        }else{
            let res = JSON.parse(xhr.response);
            console.log(res);
            localStorage.userToken = res.token;
            window.location.href = "usersAdmin/consulta.html";
        }
    }
}

btn_login.addEventListener("click", login);















