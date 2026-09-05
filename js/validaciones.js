document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. REGISTRO
    // ==========================================
    const formRegistro = document.getElementById("formRegistro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre")?.value.trim() || "";
            const apellido = document.getElementById("apellido")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const telefono = document.getElementById("telefono")?.value.trim() || "";
            const password = document.getElementById("password")?.value || "";
            const confirmPassword = document.getElementById("confirmPassword")?.value || "";
            const terminos = document.getElementById("terminos")?.checked;

            let valido = true;

            limpiarErrores(["errorNombre", "errorApellido", "errorEmail", "errorTelefono", "errorPassword", "errorConfirmPassword", "errorTerminos", "mensajeRegistro"]);

            if (nombre === "") {
                mostrarError("errorNombre", "Debes ingresar tu nombre.");
                valido = false;
            }

            if (apellido === "") {
                mostrarError("errorApellido", "Debes ingresar tu apellido.");
                valido = false;
            }

            const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === "") {
                mostrarError("errorEmail", "Debes ingresar tu correo.");
                valido = false;
            } else if (!expresionCorreo.test(email)) {
                mostrarError("errorEmail", "Ingresa un correo válido.");
                valido = false;
            }

            if (telefono === "") {
                mostrarError("errorTelefono", "Debes ingresar tu teléfono.");
                valido = false;
            }

            if (password.length < 6) {
                mostrarError("errorPassword", "La contraseña debe tener al menos 6 caracteres.");
                valido = false;
            }

            if (confirmPassword === "") {
                mostrarError("errorConfirmPassword", "Debes confirmar tu contraseña.");
                valido = false;
            } else if (password !== confirmPassword) {
                mostrarError("errorConfirmPassword", "Las contraseñas no coinciden.");
                valido = false;
            }

            if (!terminos) {
                mostrarError("errorTerminos", "Debes aceptar los términos y condiciones.");
                valido = false;
            }

            if (valido) {
                const msgExito = document.getElementById("mensajeRegistro");
                if (msgExito) {
                    msgExito.className = "alert alert-success mt-3 text-center";
                    msgExito.textContent = "¡Registro realizado correctamente!";
                }
                formRegistro.reset();
            }
        });
    }

    // ==========================================
    // 2. LOGIN
    // ==========================================
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email")?.value.trim() || "";
            const password = document.getElementById("password")?.value || "";

            let valido = true;

            limpiarErrores(["errorEmailLogin", "errorPasswordLogin", "mensajeLogin"]);

            const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === "") {
                mostrarError("errorEmailLogin", "Debes ingresar tu correo.");
                valido = false;
            } else if (!expresionCorreo.test(email)) {
                mostrarError("errorEmailLogin", "Ingresa un correo válido.");
                valido = false;
            }

            if (password === "") {
                mostrarError("errorPasswordLogin", "Ingresa tu contraseña.");
                valido = false;
            }

            if (valido) {
                const msgExito = document.getElementById("mensajeLogin");
                if (msgExito) {
                    msgExito.className = "alert alert-success mt-3 text-center";
                    msgExito.textContent = "¡Inicio de sesión exitoso!";
                }
                formLogin.reset();
            }
        });
    }

    // Funciones auxiliares
    function mostrarError(idElemento, mensaje) {
        const el = document.getElementById(idElemento);
        if (el) {
            el.textContent = mensaje;
            el.classList.add("text-danger", "small", "d-block", "mt-1");
        }
    }

    function limpiarErrores(ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "";
        });
    }
});