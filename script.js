
// =========================
// CARRITO
// =========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// =========================
// GUARDAR CARRITO
// =========================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// =========================
// FORMATO DE PRECIO
// =========================

function formatearPrecio(numero) {

    return numero.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });

}


// =========================
// MOSTRAR PRECIOS
// =========================

function mostrarPrecios() {

    let productos = document.querySelectorAll(".producto-card");


    productos.forEach(function(producto) {

        let precio = Number(
            producto.dataset.precio
        );


        let precioElemento =
            producto.querySelector(".producto-precio");


        if (precioElemento) {

            precioElemento.textContent =
                formatearPrecio(precio);

        }

    });

}


// =========================
// CANTIDAD DE PRODUCTOS
// =========================

function configurarCantidades() {

    let productos =
        document.querySelectorAll(".producto-card");


    productos.forEach(function(producto) {

        let botonMenos =
            producto.querySelector(".menos");

        let botonMas =
            producto.querySelector(".mas");

        let cantidadElemento =
            producto.querySelector(".cantidad");


        let cantidad = 1;


        // BOTÓN MENOS

        botonMenos.addEventListener(
            "click",
            function() {

                if (cantidad > 1) {

                    cantidad--;

                    cantidadElemento.textContent =
                        cantidad;

                }

            }
        );


        // BOTÓN MÁS

        botonMas.addEventListener(
            "click",
            function() {

                cantidad++;

                cantidadElemento.textContent =
                    cantidad;

            }
        );

    });

}


// =========================
// AGREGAR AL CARRITO
// =========================

function configurarBotonesCarrito() {

    let productos =
        document.querySelectorAll(".producto-card");


    productos.forEach(function(producto) {

        let boton =
            producto.querySelector(".btn-carrito");


        boton.addEventListener(
            "click",
            function() {

                let nombre =
                    producto.dataset.nombre;

                let precio =
                    Number(producto.dataset.precio);

                let cantidadElemento =
                    producto.querySelector(".cantidad");

                let cantidad =
                    Number(cantidadElemento.textContent);


                agregarCarrito(
                    nombre,
                    precio,
                    cantidad
                );


                // Volver la cantidad a 1

                cantidadElemento.textContent = 1;

            }
        );

    });

}


// =========================
// FUNCIÓN AGREGAR
// =========================

function agregarCarrito(
    nombre,
    precio,
    cantidad
) {

    let productoExistente =
        carrito.find(function(producto) {

            return producto.nombre === nombre;

        });


    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: cantidad

        });

    }


    guardarCarrito();

    actualizarContador();

    mostrarCarrito();


    alert(
        cantidad +
        " producto(s) añadido(s) al carrito."
    );

}


// =========================
// CONTADOR
// =========================

function actualizarContador() {

    let contador =
        document.getElementById(
            "contador-carrito"
        );


    if (!contador) {

        return;

    }


    let cantidadTotal = 0;


    for (
        let i = 0;
        i < carrito.length;
        i++
    ) {

        cantidadTotal +=
            carrito[i].cantidad;

    }


    contador.textContent =
        cantidadTotal;

}


// =========================
// MOSTRAR CARRITO
// =========================

function mostrarCarrito() {

    let lista =
        document.getElementById(
            "lista-carrito"
        );

    let total =
        document.getElementById(
            "total-carrito"
        );


    if (!lista || !total) {

        return;

    }


    lista.innerHTML = "";


    let suma = 0;


    // CARRITO VACÍO

    if (carrito.length === 0) {

        lista.innerHTML =
            "<p class='carrito-vacio'>" +
            "El carrito está vacío." +
            "</p>";

        total.textContent = "$0";

        return;

    }


    // MOSTRAR PRODUCTOS

    for (
        let i = 0;
        i < carrito.length;
        i++
    ) {

        let producto =
            carrito[i];


        let subtotal =
            producto.precio *
            producto.cantidad;


        suma += subtotal;


        let elemento =
            document.createElement("div");


        elemento.className =
            "carrito-producto";


        elemento.innerHTML =

            "<div>" +

                "<h3>" +
                    producto.nombre +
                "</h3>" +

                "<p>" +
                    formatearPrecio(
                        producto.precio
                    ) +
                    " cada uno" +
                "</p>" +

            "</div>" +


            "<div class='cantidad-carrito'>" +

                "<button onclick='disminuirCantidad(" +
                    i +
                ")'>" +

                    "−" +

                "</button>" +


                "<span>" +

                    producto.cantidad +

                "</span>" +


                "<button onclick='aumentarCantidad(" +
                    i +
                ")'>" +

                    "+" +

                "</button>" +

            "</div>" +


            "<div class='subtotal'>" +

                formatearPrecio(
                    subtotal
                ) +

            "</div>" +


            "<button " +
                "class='btn-eliminar' " +
                "onclick='eliminarProducto(" +
                i +
                ")'>" +

                "🗑️" +

            "</button>";


        lista.appendChild(elemento);

    }


    total.textContent =
        formatearPrecio(suma);

}


// =========================
// AUMENTAR CANTIDAD
// =========================

function aumentarCantidad(numero) {

    carrito[numero].cantidad++;


    guardarCarrito();

    mostrarCarrito();

    actualizarContador();

}


// =========================
// DISMINUIR CANTIDAD
// =========================

function disminuirCantidad(numero) {

    if (
        carrito[numero].cantidad > 1
    ) {

        carrito[numero].cantidad--;

    } else {

        carrito.splice(numero, 1);

    }


    guardarCarrito();

    mostrarCarrito();

    actualizarContador();

}


// =========================
// ELIMINAR PRODUCTO
// =========================

function eliminarProducto(numero) {

    carrito.splice(numero, 1);


    guardarCarrito();

    mostrarCarrito();

    actualizarContador();

}


// =========================
// VACIAR CARRITO
// =========================

function vaciarCarrito() {

    if (carrito.length === 0) {

        alert(
            "El carrito ya está vacío."
        );

        return;

    }


    carrito = [];


    guardarCarrito();

    mostrarCarrito();

    actualizarContador();

}


// =========================
// FINALIZAR COMPRA
// =========================

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");

        return;

    }


    const formulario =
        document.getElementById("formulario-compra");


    const resumen =
        document.getElementById("resumen-productos");


    const totalResumen =
        document.getElementById("resumen-total");


    if (!formulario || !resumen || !totalResumen) {

        alert(
            "No se encontró el formulario de compra."
        );

        return;

    }


    // Limpiar resumen anterior

    resumen.innerHTML = "";


    let total = 0;


    // Mostrar productos

    carrito.forEach(function(producto) {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        const productoResumen =
            document.createElement("div");


        productoResumen.className =
            "producto-resumen";


        productoResumen.innerHTML = `

            <div>

                <strong>
                    ${producto.nombre}
                </strong>

                <span>
                    Cantidad: ${producto.cantidad}
                </span>

            </div>

            <strong>
                ${formatearPrecio(subtotal)}
            </strong>

        `;


        resumen.appendChild(
            productoResumen
        );

    });


    // Mostrar total

    totalResumen.textContent =
        formatearPrecio(total);


    // Mostrar formulario

    formulario.style.display =
        "block";


    // Desplazarse hasta el formulario

    formulario.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

// =========================
// CONTACTO
// ==========================

function contactar() {

    alert(
        "Gracias por comunicarte con Estéreo."
    );

}


// =========================
// MENÚ ACTIVO
// =========================

function actualizarMenuActivo() {

    let enlaces =
        document.querySelectorAll(
            ".nav-menu a"
        );


    let secciones =
        document.querySelectorAll(
            "main section[id]"
        );


    let posicion =
        window.scrollY + 150;


    secciones.forEach(function(seccion) {

        let inicio =
            seccion.offsetTop;

        let final =
            inicio +
            seccion.offsetHeight;


        if (
            posicion >= inicio &&
            posicion < final
        ) {

            enlaces.forEach(function(enlace) {

                enlace.classList.remove(
                    "active"
                );

            });


            let enlaceActivo =
                document.querySelector(
                    '.nav-menu a[href="#' +
                    seccion.id +
                    '"]'
                );


            if (enlaceActivo) {

                enlaceActivo.classList.add(
                    "active"
                );

            }

        }

    });

}


// =========================
// CUANDO CARGA LA PÁGINA
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarContador();

        mostrarCarrito();

        mostrarPrecios();

        configurarCantidades();

        configurarBotonesCarrito();


        // BOTÓN VACIAR

        let botonVaciar =
            document.getElementById(
                "btn-vaciar"
            );


        if (botonVaciar) {

            botonVaciar.addEventListener(
                "click",
                vaciarCarrito
            );

        }


        // BOTÓN FINALIZAR

        let botonComprar =
            document.getElementById(
                "btn-comprar"
            );


        if (botonComprar) {

            botonComprar.addEventListener(
                "click",
                finalizarCompra
            );

        }


        // BOTÓN CONTACTO

        let botonContacto =
            document.getElementById(
                "btn-contacto"
            );


        if (botonContacto) {

            botonContacto.addEventListener(
                "click",
                contactar
            );

        }

    }
);


// =========================
// ACTUALIZAR MENÚ AL DESPLAZAR
// =========================

window.addEventListener(
    "scroll",
    actualizarMenuActivo
);

// =========================
// FORMULARIO DE COMPRA
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const formulario =
            document.getElementById(
                "formulario-pedido"
            );


        const botonVolver =
            document.getElementById(
                "btn-volver-carrito"
            );


        // =========================
        // ENVIAR PEDIDO A WHATSAPP
        // =========================

        if (formulario) {

            formulario.addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();


                    if (carrito.length === 0) {

                        alert(
                            "El carrito está vacío."
                        );

                        return;

                    }


                    // DATOS DEL CLIENTE

                    const nombre =
                        document.getElementById(
                            "nombre-cliente"
                        ).value.trim();


                    const telefono =
                        document.getElementById(
                            "telefono-cliente"
                        ).value.trim();


                    const direccion =
                        document.getElementById(
                            "direccion-cliente"
                        ).value.trim();


                    const ciudad =
                        document.getElementById(
                            "ciudad-cliente"
                        ).value.trim();


                    const pago =
                        document.getElementById(
                            "metodo-pago"
                        ).value;


                    const comentario =
                        document.getElementById(
                            "comentario-cliente"
                        ).value.trim();


                    // CREAR MENSAJE

                    let mensaje =
                        "🛒 *NUEVO PEDIDO - ESTÉREO*";


                    mensaje +=
                        "\n\n👤 *Datos del cliente*";


                    mensaje +=
                        "\nNombre: " +
                        nombre;


                    mensaje +=
                        "\nTeléfono: " +
                        telefono;


                    mensaje +=
                        "\nDirección: " +
                        direccion;


                    mensaje +=
                        "\nCiudad: " +
                        ciudad;


                    mensaje +=
                        "\nMétodo de pago: " +
                        pago;


                    mensaje +=
                        "\n\n📦 *PRODUCTOS*";


                    let total = 0;


                    carrito.forEach(
                        function(producto) {

                            const subtotal =
                                producto.precio *
                                producto.cantidad;


                            total += subtotal;


                            mensaje +=
                                "\n\n• " +
                                producto.nombre;


                            mensaje +=
                                "\n  Cantidad: " +
                                producto.cantidad;


                            mensaje +=
                                "\n  Precio: " +
                                formatearPrecio(
                                    producto.precio
                                );


                            mensaje +=
                                "\n  Subtotal: " +
                                formatearPrecio(
                                    subtotal
                                );

                        }
                    );


                    mensaje +=
                        "\n\n💰 *TOTAL: " +
                        formatearPrecio(total) +
                        "*";


                    if (comentario !== "") {

                        mensaje +=
                            "\n\n📝 *Comentario:* " +
                            comentario;

                    }


                    mensaje +=
                        "\n\nHola, quiero continuar con este pedido. Gracias.";


                    // NÚMERO DE WHATSAPP DE ESTÉREO

                    const numeroWhatsApp =
                        "573003717192";


                    // CREAR URL

                    const urlWhatsApp =
                        "https://wa.me/" +
                        numeroWhatsApp +
                        "?text=" +
                        encodeURIComponent(
                            mensaje
                        );


                    // ABRIR WHATSAPP

                    window.open(
                        urlWhatsApp,
                        "_blank"
                    );

                }
            );

        }


        // =========================
        // VOLVER AL CARRITO
        // =========================

        if (botonVolver) {

            botonVolver.addEventListener(
                "click",
                function() {

                    const formulario =
                        document.getElementById(
                            "formulario-compra"
                        );


                    formulario.style.display =
                        "none";


                    const carritoSeccion =
                        document.getElementById(
                            "carrito"
                        );


                    carritoSeccion.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        }

    }
);