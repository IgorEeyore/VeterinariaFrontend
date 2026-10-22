let carrito = JSON.parse(localStorage.getItem("carritoSanMarcos")) || [];

function renderizarCatalogo() {
    let contenedor = document.getElementById("contenedorServicios");
    let modales = document.getElementById("contenedorModales");
    
    contenedor.innerHTML = "";
    modales.innerHTML = "";

    for (let i = 0; i < serviciosVeterinaria.length; i++) {
        contenedor.innerHTML += `
            <div class="col-12 col-md-4">
                <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <img src="${serviciosVeterinaria[i].imagen}" class="card-img-top" alt="${serviciosVeterinaria[i].nombre}" style="height: 220px; object-fit: cover;">
                    <div class="card-body d-flex flex-column p-4">
                        <h5 class="card-title fw-bold text-dark">${serviciosVeterinaria[i].nombre}</h5>
                        <p class="fw-bold text-success fs-4 mb-2">$${serviciosVeterinaria[i].precio.toLocaleString("es-CL")}</p>
                        <p class="card-text text-muted mb-4">${serviciosVeterinaria[i].descripcionCorta}</p>
                        
                        <div class="mt-auto d-flex flex-column gap-2">
                            <button type="button" class="btn btn-outline-secondary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#modalServicio${serviciosVeterinaria[i].id}">
                                Ver detalles
                            </button>
                            <button type="button" class="btn btn-custom-primary w-100 fw-bold" onclick="agregarAlCarrito(${serviciosVeterinaria[i].id})">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modales.innerHTML += `
            <div class="modal fade" id="modalServicio${serviciosVeterinaria[i].id}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-header bg-sanmarcos text-white border-0">
                            <h5 class="modal-title fw-bold">${serviciosVeterinaria[i].nombre}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="row align-items-center">
                                <div class="col-md-6 mb-3 mb-md-0">
                                    <img src="${serviciosVeterinaria[i].imagen}" class="img-fluid rounded shadow-sm w-100" style="object-fit: cover; max-height: 300px;">
                                </div>
                                <div class="col-md-6">
                                    <h4 class="fw-bold text-success mb-3">Valor: $${serviciosVeterinaria[i].precio.toLocaleString("es-CL")}</h4>
                                    <p class="text-muted fs-5 mb-0">${serviciosVeterinaria[i].descripcionLarga}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-custom-primary fw-bold px-4" onclick="agregarAlCarrito(${serviciosVeterinaria[i].id})" data-bs-dismiss="modal">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function agregarAlCarrito(idServicio) {
    let servicioEncontrado;
    for (let i = 0; i < serviciosVeterinaria.length; i++) {
        if (serviciosVeterinaria[i].id === idServicio) {
            servicioEncontrado = serviciosVeterinaria[i];
            break;
        }
    }

    if (servicioEncontrado) {
        carrito.push(servicioEncontrado);
        localStorage.setItem("carritoSanMarcos", JSON.stringify(carrito));
        alert("¡" + servicioEncontrado.nombre + " se ha agregado al carrito!");
    }
}

renderizarCatalogo();
