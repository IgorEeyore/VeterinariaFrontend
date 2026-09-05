function cargarRegiones() {
    let selectRegion = document.getElementById("region");
    if (!selectRegion) return;
    
    selectRegion.innerHTML = '<option value="">Seleccione una región</option>';
    
    for (let i = 0; i < datosRegiones.length; i++) {
        let opcion = document.createElement("option");
        opcion.value = datosRegiones[i].region;
        opcion.textContent = datosRegiones[i].region;
        selectRegion.appendChild(opcion);
    }
}

function cargarComunas() {
    let selectRegion = document.getElementById("region").value;
    let selectComuna = document.getElementById("comuna");
    
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
    
    if (selectRegion === "") return;
    
    let comunas = [];
    for (let i = 0; i < datosRegiones.length; i++) {
        if (datosRegiones[i].region === selectRegion) {
            comunas = datosRegiones[i].comunas;
            break;
        }
    }
    
    for (let j = 0; j < comunas.length; j++) {
        let opcion = document.createElement("option");
        opcion.value = comunas[j];
        opcion.textContent = comunas[j];
        selectComuna.appendChild(opcion);
    }
}

window.onload = function() {
    cargarRegiones();
};

function validarLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Debe completar todos los campos");
        return;
    }

    if (email.length > 100) {
        alert("El correo no puede tener más de 100 caracteres");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (password.length < 4 || password.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres");
        return;
    }

    if (email === "admin@demo.cl" && password === "1234") {
        window.location.href = "../paginaPrincipal.html";
    } else if (email === "usuario@demo.cl" && password === "5678") {
        window.location.href = "../paginaPrincipal.html";
    } else {
        alert("Correo o clave incorrectos");
    }
}

function validarRut(rut) {
    let valor = rut.replace(/\./g, '').replace(/-/g, '');
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    
    if (cuerpo.length < 7) { return false; }
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    
    let dvEsperado = 11 - (suma % 11);
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
    
    if (dvEsperado != dv) { return false; }
    return true;
}

function validarRegistro() {
    let rut = document.getElementById("rut").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;
    let region = document.getElementById("region").value;
    let comuna = document.getElementById("comuna").value;
    let direccion = document.getElementById("direccion").value;
    let terminos = document.getElementById("terminos").checked;

    if (rut === "" || nombre === "" || apellido === "" || email === "" || tipoUsuario === "" || region === "" || comuna === "" || direccion === "") {
        alert("Debe completar todos los campos obligatorios");
        return;
    }

    let formatoRut = /^[0-9]+[0-9Kk]$/;
    if (!formatoRut.test(rut)) {
        alert("El RUN debe ingresarse sin puntos ni guion");
        return;
    }
    
    if (!validarRut(rut)) {
        alert("El RUN ingresado no es válido (Dígito verificador incorrecto)");
        return;
    }

    if (nombre.length > 50) {
        alert("El nombre no puede tener más de 50 caracteres");
        return;
    }

    if (apellido.length > 100) {
        alert("Los apellidos no pueden tener más de 100 caracteres");
        return;
    }

    if (email.length > 100) {
        alert("El correo no puede tener más de 100 caracteres");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (direccion.length > 300) {
        alert("La dirección no puede tener más de 300 caracteres");
        return;
    }

    if (!terminos) {
        alert("Debes aceptar los términos y condiciones");
        return;
    }

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
}