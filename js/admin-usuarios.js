let usuariosAdmin = JSON.parse(localStorage.getItem("usuariosSanMarcos")) || [
    { id: 1, nombre: "Matías Figueroa", correo: "m.figueroav@duocuc.cl", rol: "Admin" },
    { id: 2, nombre: "Cliente Ejemplo", correo: "cliente@correo.cl", rol: "Cliente" }
];
let idEditando = null;

function renderizarUsuarios() {
    let tabla = document.getElementById("cuerpoTablaUsuarios");
    tabla.innerHTML = "";
    
    for (let i = 0; i < usuariosAdmin.length; i++) {
        let badgeRol = "";
        if (usuariosAdmin[i].rol === "Admin") {
            badgeRol = '<span class="badge" style="background-color: #2b3060;">Admin</span>';
        } else {
            badgeRol = '<span class="badge bg-secondary">Cliente</span>';
        }
        
        tabla.innerHTML += `
            <tr>
                <td>${usuariosAdmin[i].id}</td>
                <td>${usuariosAdmin[i].nombre}</td>
                <td>${usuariosAdmin[i].correo}</td>
                <td>${badgeRol}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="abrirEditarUsuario(${usuariosAdmin[i].id})">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function abrirCrearUsuario() {
    idEditando = null;
    document.getElementById("modalTitulo").textContent = "Agregar Nuevo Usuario";
    document.getElementById("usuarioNombre").value = "";
    document.getElementById("usuarioCorreo").value = "";
    document.getElementById("usuarioPassword").value = "";
    document.getElementById("usuarioRol").value = "Cliente";
    
    let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
    modal.show();
}

function abrirEditarUsuario(idBuscado) {
    let usuarioEncontrado = null;
    for (let i = 0; i < usuariosAdmin.length; i++) {
        if (usuariosAdmin[i].id === idBuscado) {
            usuarioEncontrado = usuariosAdmin[i];
            break;
        }
    }
    
    if (usuarioEncontrado) {
        idEditando = usuarioEncontrado.id;
        document.getElementById("modalTitulo").textContent = "Editar Usuario";
        document.getElementById("usuarioNombre").value = usuarioEncontrado.nombre;
        document.getElementById("usuarioCorreo").value = usuarioEncontrado.correo;
        document.getElementById("usuarioRol").value = usuarioEncontrado.rol;
        document.getElementById("usuarioPassword").value = "";
        
        let modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
        modal.show();
    }
}

function eliminarUsuario(indice) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        usuariosAdmin.splice(indice, 1);
        localStorage.setItem("usuariosSanMarcos", JSON.stringify(usuariosAdmin));
        renderizarUsuarios();
    }
}

function guardarUsuario(event) {
    event.preventDefault();
    
    let nombre = document.getElementById("usuarioNombre").value;
    let correo = document.getElementById("usuarioCorreo").value;
    let password = document.getElementById("usuarioPassword").value;
    let rol = document.getElementById("usuarioRol").value;
    
    if (nombre === "" || correo === "" || rol === "") {
        alert("Debe completar todos los campos obligatorios.");
        return;
    }

    let formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (idEditando === null && password === "") {
        alert("La contraseña es obligatoria para un nuevo usuario.");
        return;
    }

    if (password !== "" && (password.length < 4 || password.length > 10)) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }
    
    if (idEditando !== null) {
        for (let i = 0; i < usuariosAdmin.length; i++) {
            if (usuariosAdmin[i].id === idEditando) {
                usuariosAdmin[i].nombre = nombre;
                usuariosAdmin[i].correo = correo;
                usuariosAdmin[i].rol = rol;
                break;
            }
        }
        alert("Usuario actualizado con éxito.");
    } else {
        let nuevoId = 1;
        if (usuariosAdmin.length > 0) {
            nuevoId = usuariosAdmin[usuariosAdmin.length - 1].id + 1;
        }
        
        let nuevoUsuario = {
            id: nuevoId,
            nombre: nombre,
            correo: correo,
            rol: rol
        };
        usuariosAdmin.push(nuevoUsuario);
        alert("Usuario creado con éxito.");
    }
    
    localStorage.setItem("usuariosSanMarcos", JSON.stringify(usuariosAdmin));
    
    let modalElement = document.getElementById("modalUsuario");
    let modal = bootstrap.Modal.getInstance(modalElement);
    if (!modal) {
        modal = new bootstrap.Modal(modalElement);
    }
    modal.hide();
    
    renderizarUsuarios();
}

renderizarUsuarios();
