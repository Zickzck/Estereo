// =========================
// CARRITO
// =========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// =========================
// AGREGAR PRODUCTO
// =========================

function agregarCarrito(nombre, precio) {

    let productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }


    guardarCarrito();

    actualizarContador();

    alert("Producto añadido al carrito");
}


// =========================
// GUARDAR CARRITO
// =========================

function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}


// =========================
// CONTADOR DEL CARRITO
// =========================

function actualizarContador() {

    let contador = document.getElementById("contador-carrito");

    if (!contador) {
        return;
    }


    let cantidadTotal = 0;


    for (let i = 0; i < carrito.length; i++) {

        cantidadTotal += carrito[i].cantidad;

    }


    contador.innerHTML = cantidadTotal;

}


// =========================
// MOSTRAR CARRITO
// =========================

function mostrarCarrito() {

    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total-carrito");


    if (!lista || !total) {
        return;
    }


    lista.innerHTML = "";

    let suma = 0;


    if (carrito.length === 0) {

        lista.innerHTML = "<p class='carrito-vacio'>El carrito está vacío.</p>";

        total.innerHTML = "$0";

        return;
    }


    for (let i = 0; i < carrito.length; i++) {

        let producto = carrito[i];

        let subtotal = producto.precio * producto.cantidad;

        suma += subtotal;


        let elemento = document.createElement("div");

        elemento.className = "carrito-producto";


        elemento.innerHTML =

            "<div>" +

                "<h3>" + producto.nombre + "</h3>" +

                "<p>" +
                    formatearPrecio(producto.precio) +
                    " cada uno" +
                "</p>" +

            "</div>" +


            "<div class='cantidad'>" +

                "<button onclick='disminuirCantidad(" + i + ")'>−</button>" +

                "<span>" +
                    producto.cantidad +
                "</span>" +

                "<button onclick='aumentarCantidad(" + i + ")'>+</button>" +

            "</div>" +


            "<div class='subtotal'>" +

                formatearPrecio(subtotal) +

            "</div>" +


            "<button class='btn-eliminar' onclick='eliminarProducto(" + i + ")'>" +

                "🗑️" +

            "</button>";


        lista.appendChild(elemento);

    }


    total.innerHTML = formatearPrecio(suma);

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

    if (carrito[numero].cantidad > 1) {

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

    carrito = [];

    guardarCarrito();

    mostrarCarrito();

    actualizarContador();

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
// AL CARGAR CUALQUIER PÁGINA
// =========================

document.addEventListener("DOMContentLoaded", function() {

    actualizarContador();

    mostrarCarrito();

});