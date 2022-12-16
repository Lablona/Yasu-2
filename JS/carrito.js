let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritoComprado.classList.add("disabled")

    contenedorCarritoProductos.innerHTML = "",

    productosEnCarrito.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = 
       `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
       <div class="carrito-producto-titulo">
           <small>Titulo</small>
           <h3>${producto.titulo}</h3>
       </div>
       <div class="carrito-producto-cantidad">
           <small>Cantidad</small>
           <p>${producto.cantidad}</p>
       </div>
       <div class="carrito-producto-precio">
           <small>Precio</small>
           <p>$${producto.precio}</p>
       </div>
       <div class="carrito-producto-subtotal">
           <small>Subtotal</small>
           <p>$${producto.cantidad * producto.precio}</p>
       </div>
       <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
   </div>`

        contenedorCarritoProductos.append(div)

    })


} else {

    contenedorCarritoVacio.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.add("disabled")
}
actualizarBotonesEliminar();
actualizarTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito );
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto =>producto.id === idBoton)
    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito();
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")

    Swal.fire({
        title: 'Atento/a!',
        text: 'Te enviaremos una mail con el seguimiento del envío de tu compra',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        iconColor: `rgb(51, 162, 214)`,
        confirmButtonColor: `rgb(51, 162, 214)`,
        iconHtml: `<i class="bi bi-hand-thumbs-up"></i>`
    })

}


const urlUsuarios = "https://jsonplaceholder.typicode.com/users";
const listaUsuarios =document.querySelector("#lista-usuarios")
//agregar los nombres de los ultimos compradores
/*fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => console.log(json))*/

  fetch(urlUsuarios)
        .then(response => response.json())
        .then(data => {
            data.forEach(usuario => {
                const li =document.createElement("li");
                li.textContent = usuario.name;
                listaUsuarios.append(li);
            })
        })