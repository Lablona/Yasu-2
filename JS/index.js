const productos = [
    ////////// MOTHER ///////////////
    {
        id: "mother-01",
        titulo: "Mother 01",
        imagen:"./Img/mother1.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 18000,
    },
    {
        id: "mother-02",
        titulo: "Mother 02",
        imagen:"./Img/mother2.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 20000,
    },
    {
        id: "mother-03",
        titulo: "Mother 03",
        imagen:"./Img/mother3.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 39000,
    },
    {
        id: "mother-04",
        titulo: "Mother 04",
        imagen:"./Img/mother4.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 46000,
    },
    {
        id: "mother-05",
        titulo: "Mother 05",
        imagen:"./Img/mother5.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 52000,
    },
    {
        id: "mother-06",
        titulo: "Mother 06",
        imagen:"./Img/mother6.jpg",
        categoria:{
            nombre: "Mothers",
            id: "mothers"       
        },
        precio: 66000,
    },
    /////////////// PRO ////////////////
    {
        id: "pro-01",
        titulo: "Procesador 01",
        imagen:"./Img/pro1.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 32000,
    },
    {
        id: "pro-02",
        titulo: "Procesador 02",
        imagen:"./Img/pro2.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 48000,
    },
    {
        id: "pro-03",
        titulo: "Procesador 03",
        imagen:"./Img/pro3.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 60000,
    },
    {
        id: "pro-04",
        titulo: "Procesador 04",
        imagen:"./Img/pro4.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 72000,
    },
    {
        id: "pro-05",
        titulo: "Procesador 05",
        imagen:"./Img/pro5.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 94000,
    },
    {
        id: "pro-06",
        titulo: "Procesador 06",
        imagen:"./Img/pro6.jpg",
        categoria:{
            nombre: "Procesadores",
            id: "pros"       
        },
        precio: 110000,
    },
    ////////////// RAM //////////////////
    {
        id: "ram-01",
        titulo: "Ram 01",
        imagen:"./Img/ram1.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 9000,
    },
    {
        id: "ram-02",
        titulo: "Ram 02",
        imagen:"./Img/ram2.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 20000,
    },
    {
        id: "ram-03",
        titulo: "Ram 03",
        imagen:"./Img/ram3.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 22000,
    },
    {
        id: "ram-04",
        titulo: "Ram 04",
        imagen:"./Img/ram4.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 34000,
    },
    {
        id: "ram-05",
        titulo: "Ram 05",
        imagen:"./Img/ram5.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 52000,
    },
    {
        id: "ram-06",
        titulo: "Ram 06",
        imagen:"./Img/ram6.jpg",
        categoria:{
            nombre: "Memorias Ram",
            id: "rams"       
        },
        precio: 67000,
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
               <h3 class="producto-titulo">${producto.titulo}</h3>
               <p class="producto-precio">$${producto.precio}</p>
               <button class="producto-agregar" id = "${producto.id}" >Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);

    })
    
    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito );
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else { 
    productosEnCarrito = []
}

function agregarAlCarrito (e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}