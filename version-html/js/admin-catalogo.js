let catalogoAdmin = JSON.parse(localStorage.getItem("catalogoSanMarcos")) || [
    { id: 1, nombre: "Consulta General", categoria: "Servicio", precio: 15000 },
    { id: 2, nombre: "Vacunacion anual", categoria: "Servicio", precio: 25000 },
    { id: 3, nombre: "Peluquería Canina/Felina", categoria: "Servicio", precio: 18000 }
];
let idEditandoCatalogo = null;

function renderizarCatalogoAdmin() {
    let tabla = document.getElementById("cuerpoTablaCatalogo");
    tabla.innerHTML = "";
    
    for (let i = 0; i < catalogoAdmin.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${catalogoAdmin[i].id}</td>
                <td>${catalogoAdmin[i].nombre}</td>
                <td><span class="badge text-white" style="background-color: #2ec4b6;">${catalogoAdmin[i].categoria}</span></td>
                <td>$${catalogoAdmin[i].precio.toLocaleString("es-CL")}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="abrirEditarCatalogo(${catalogoAdmin[i].id})">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarCatalogo(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function abrirCrearCatalogo() {
    idEditandoCatalogo = null;
    document.getElementById("modalTituloCatalogo").textContent = "Agregar Nuevo Servicio";
    document.getElementById("catalogoNombre").value = "";
    document.getElementById("catalogoCategoria").value = "Servicio";
    document.getElementById("catalogoPrecio").value = "";
    
    let modal = new bootstrap.Modal(document.getElementById("modalCatalogo"));
    modal.show();
}

function abrirEditarCatalogo(idBuscado) {
    let itemEncontrado = null;
    for (let i = 0; i < catalogoAdmin.length; i++) {
        if (catalogoAdmin[i].id === idBuscado) {
            itemEncontrado = catalogoAdmin[i];
            break;
        }
    }
    
    if (itemEncontrado) {
        idEditandoCatalogo = itemEncontrado.id;
        document.getElementById("modalTituloCatalogo").textContent = "Editar Servicio";
        document.getElementById("catalogoNombre").value = itemEncontrado.nombre;
        document.getElementById("catalogoCategoria").value = itemEncontrado.categoria;
        document.getElementById("catalogoPrecio").value = itemEncontrado.precio;
        
        let modal = new bootstrap.Modal(document.getElementById("modalCatalogo"));
        modal.show();
    }
}

function eliminarCatalogo(indice) {
    if (confirm("¿Estás seguro de que deseas eliminar este ítem?")) {
        catalogoAdmin.splice(indice, 1);
        localStorage.setItem("catalogoSanMarcos", JSON.stringify(catalogoAdmin));
        renderizarCatalogoAdmin();
    }
}

function guardarCatalogo(event) {
    event.preventDefault();
    
    let nombre = document.getElementById("catalogoNombre").value.trim();
    let categoria = document.getElementById("catalogoCategoria").value;
    let precio = document.getElementById("catalogoPrecio").value;
    
    if (nombre === "" || categoria === "" || precio === "") {
        alert("Debe completar todos los campos obligatorios.");
        return;
    }
    
    let precioNumero = Number(precio);
    if (isNaN(precioNumero) || precioNumero <= 0) {
        alert("El precio debe ser un número válido mayor a 0.");
        return;
    }
    
    if (idEditandoCatalogo !== null) {
        for (let i = 0; i < catalogoAdmin.length; i++) {
            if (catalogoAdmin[i].id === idEditandoCatalogo) {
                catalogoAdmin[i].nombre = nombre;
                catalogoAdmin[i].categoria = categoria;
                catalogoAdmin[i].precio = precioNumero;
                break;
            }
        }
        alert("Servicio actualizado con éxito.");
    } else {
        let nuevoId = 1;
        if (catalogoAdmin.length > 0) {
            nuevoId = catalogoAdmin[catalogoAdmin.length - 1].id + 1;
        }
        
        let nuevoItem = {
            id: nuevoId,
            nombre: nombre,
            categoria: categoria,
            precio: precioNumero
        };
        catalogoAdmin.push(nuevoItem);
        alert("Servicio creado con éxito.");
    }
    
    localStorage.setItem("catalogoSanMarcos", JSON.stringify(catalogoAdmin));
    
    let modalElement = document.getElementById("modalCatalogo");
    let modal = bootstrap.Modal.getInstance(modalElement);
    if (!modal) {
        modal = new bootstrap.Modal(modalElement);
    }
    modal.hide();
    
    renderizarCatalogoAdmin();
}

renderizarCatalogoAdmin();
