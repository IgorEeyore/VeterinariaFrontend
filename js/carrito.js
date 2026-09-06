let carrito = JSON.parse(localStorage.getItem("carritoSanMarcos")) || [];

function renderizarCarrito() {
    let tabla = document.getElementById("tablaCarrito");
    let totalElemento = document.getElementById("totalCarrito");
    
    tabla.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        tabla.innerHTML = `<tr><td colspan="3" class="text-center py-5 text-muted fs-5">Tu carrito está vacío. <br></br><a href="catalogo.html" class="text-success text-decoration-none fw-bold mt-2 d-inline-block">Ir al catálogo de servicios</a></td></tr>`;
        totalElemento.textContent = "$0";
        return;
    }

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;

        tabla.innerHTML += `
            <tr>
                <td class="fw-semibold fs-5 text-dark">
                    ${carrito[i].nombre}
                </td>
                <td class="fs-5 fw-bold text-success">$${carrito[i].precio.toLocaleString("es-CL")}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger fw-bold px-3" onclick="eliminarDelCarrito(${i})">X Eliminar</button>
                </td>
            </tr>
        `;
    }

    totalElemento.textContent = "$" + total.toLocaleString("es-CL");
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem("carritoSanMarcos", JSON.stringify(carrito));
    renderizarCarrito();
}

function procesarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Reserva procesada con éxito!");
    carrito = [];
    localStorage.setItem("carritoSanMarcos", JSON.stringify(carrito));
    renderizarCarrito();
}

renderizarCarrito();
