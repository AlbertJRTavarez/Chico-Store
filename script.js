// script.js

// Variable global para el carrito y factura
let cart = [];
let currentProduct = null; // Producto seleccionado para añadir (se usa en el modal de cantidad)
let invoiceCounter = 1; // Contador de facturas

// Array de productos de ejemplo (con imágenes dadas y detalles de modelos de converse)
const exampleProducts = [
  {
    id: 1,
    name: "Converse Classic 1",
    price: 50.00,
    image: "https://img.freepik.com/premium-photo/back-school-concept-with-shoe-blu-pink_959624-77.jpg"
  },
  {
    id: 2,
    name: "Converse Classic 2",
    price: 55.00,
    image: "https://bpic.588ku.com/back_origin_min_pic/24/01/29/d2adf3ea6c4ab0ebf35627dd6487fbe9.jpg!/fw/750/quality/99/unsharp/true/compress/true"
  },
  {
    id: 3,
    name: "Converse Modern",
    price: 60.00,
    image: "https://muscleevolved.com/wp-content/uploads/2022/03/kris-gerhard-0BKZfcamvGg-unsplash-1132x800.jpeg"
  },
  {
    id: 4,
    name: "Converse Vibrant",
    price: 65.00,
    image: "https://img.freepik.com/premium-photo/pair-yellow-sneakers-green-background_185193-64043.jpg"
  },
  {
    id: 5,
    name: "Converse All Star",
    price: 70.00,
    image: "https://lillean.fbitsstatic.net/img/p/tenis-all-star-monocromatico-converse-85124/304036-2.jpg?w=1000&h=1000&v=no-change&qs=ignore"
  },
  {
    id: 6,
    name: "Converse Urban",
    price: 75.00,
    image: "https://uhane.es/wp-content/uploads/2023/03/20230330_190701-1024x1024.jpg"
  },
  {
    id: 7,
    name: "Converse Street",
    price: 80.00,
    image: "https://th.bing.com/th/id/OIP.h8LqF31q8ofed19YtBVgzQHaKX?w=1600&h=2240&rs=1&pid=ImgDetMain"
  },
  {
    id: 8,
    name: "Converse Limited",
    price: 85.00,
    image: "https://www.bergstromoriginals.com/cdn/shop/products/Bos-and-Co-Maya-white-life-4.jpg?v=1704816089"
  },
  {
    id: 9,
    name: "Converse Retro",
    price: 90.00,
    image: "https://th.bing.com/th/id/R.361b048560cce8271b078e2632cb75e2?rik=cmeYvHW%2fae0o9Q&riu=http%3a%2f%2fk.sinaimg.cn%2fn%2fsinakd202048s%2f560%2fw1080h1080%2f20200408%2fd493-iryninw5863647.jpg%2fw700d1q75cms.jpg&ehk=BcPbpNh7vpo7iTHATDCp3kPtsTrxh1mU5JEn%2bq5Cz5Q%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: 10,
    name: "Converse Edge",
    price: 95.00,
    image: "https://th.bing.com/th/id/OIP.D8ytFd0IZrld7rxONawSqQAAAA?rs=1&pid=ImgDetMain"
  }
];

// Función para renderizar las tarjetas de productos
function renderProducts(products) {
  const container = document.getElementById('productContainer');
  container.innerHTML = ''; // Limpiar contenedor

  products.forEach(product => {
    // Crear la tarjeta usando Bootstrap
    const card = document.createElement('div');
    card.className = 'col-md-4';

    card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto addCartBtn" data-product-id="${product.id}">Añadir al carrito</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Asignar evento click a cada botón "Añadir al carrito"
  const addCartButtons = document.querySelectorAll('.addCartBtn');
  addCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const prodId = parseInt(button.getAttribute('data-product-id'));
      currentProduct = products.find(p => p.id === prodId);
      // Mostrar modal de cantidad
      const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
      quantityModal.show();
    });
  });
}

// Función para actualizar la notificación del carrito
function updateCartNotification() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.innerText = totalItems;
}

// Función para renderizar el contenido del carrito en el modal
function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.product.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.className = "d-flex justify-content-between border-bottom py-2";
    itemDiv.innerHTML = `
      <div>
        <strong>${item.product.name}</strong> x ${item.quantity}
      </div>
      <div>
        $${(item.product.price * item.quantity).toFixed(2)}
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
  document.getElementById('cartTotal').innerText = total.toFixed(2);
}

// Evento para el botón "Añadir al carrito" del modal de cantidad
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  if (currentProduct && quantity > 0) {
    // Verificar si el producto ya está en el carrito
    const existItem = cart.find(item => item.product.id === currentProduct.id);
    if (existItem) {
      existItem.quantity += quantity;
    } else {
      cart.push({ product: currentProduct, quantity: quantity });
    }
    updateCartNotification();
    renderCart();
  }
});

// Funcionalidad de búsqueda dinámica
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredProducts = exampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
});

// Renderizamos los productos iniciales
renderProducts(exampleProducts);

// Evento para el formulario de pago y generación de factura PDF
document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Recopilamos datos del formulario
  const customerName = document.getElementById('customerName').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const phone = document.getElementById('phone').value;
  const city = document.getElementById('city').value;
  
  // Generar contenido de resumen del pago
  let summary = "Factura #" + invoiceCounter + "\nEmpresa: Tienda Converse\n\n";
  summary += "Cliente: " + customerName + "\nTeléfono: " + phone + "\nCiudad/Provincia: " + city + "\n\n";
  summary += "Detalle de Compra:\n";
  summary += "---------------------------------\n";
  
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.product.price * item.quantity;
    total += subtotal;
    summary += `${item.product.name} x ${item.quantity} = $${subtotal.toFixed(2)}\n`;
  });
  summary += "---------------------------------\n";
  summary += "Subtotal: $" + total.toFixed(2) + "\n";
  summary += "Total: $" + total.toFixed(2) + "\n";

  // Uso de jsPDF para generar PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado de factura
  doc.setFontSize(12);
  doc.text("Tienda Converse", 15, 15);
  doc.text("Factura #" + invoiceCounter, 180, 15, { align: "right" });
  
  // Tabla de resumen (se simplifica el formato en texto)
  doc.text(summary, 15, 30);
  
  // Guardar PDF
  doc.save(`Factura_${invoiceCounter}.pdf`);

  // Reiniciar carrito y formularios
  cart = [];
  updateCartNotification();
  renderCart();
  invoiceCounter++; // Incrementar contador de facturas
  this.reset();
  alert("Pago procesado y factura generada.");
});
