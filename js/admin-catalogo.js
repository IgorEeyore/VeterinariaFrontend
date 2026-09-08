let catalogoAdmin = JSON.parse(localStorage.getItem("catalogoSanMarcos")) || [
    { id: 1, nombre: "Consulta General", categoria: "Servicio", precio: 15000 },
    { id: 2, nombre: "Vacunacion anual", categoria: "Servicio", precio: 25000 },
    { id: 3, nombre: "Peluquería Canina/Felina", categoria: "Servicio", precio: 18000 }
];

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
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="editarCatalogo()">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarCatalogo(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function eliminarCatalogo(indice) {
    if (confirm("¿Estás seguro de que deseas eliminar este ítem?")) {
        catalogoAdmin.splice(indice, 1);
        localStorage.setItem("catalogoSanMarcos", JSON.stringify(catalogoAdmin));
        renderizarCatalogoAdmin();
    }
}

function editarCatalogo() {
    alert("Modo edición activado para este registro.");
}

function abrirCrearCatalogo() {
    alert("Pronto podrás crear nuevos servicios aquí.");
}

renderizarCatalogoAdmin();
