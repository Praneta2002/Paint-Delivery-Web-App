// 

const products = [
    { id: 1, imgSrc: "po1.jpg", title: "Girl’s portrait", price: "₹82,190" },
    { id: 2, imgSrc: "po2.jpg", title: "Tribal Queen", price: "₹73,221" },
    { id: 3, imgSrc: "po3.jpg", title: "SAHELI", price: "₹35,981" },
    { id: 4, imgSrc: "po4.jpg", title: "Marilyn Monroe", price: "₹66,780" },
    { id: 5, imgSrc: "po5.jpg", title: "Expression", price: "₹24,621" },
    { id: 6, imgSrc: "po6.jpg", title: "Knife POP ART PORTRAIT", price: "₹77,991" },
    { id: 7, imgSrc: "po7.jpg", title: "Pop letters", price: "₹70,081" },
    { id: 8, imgSrc: "po8.jpg", title: "BANJARE", price: "₹83,100" },
    { id: 9, imgSrc: "p4.jpeg", title: "Popart", price: "₹19,201" },
    { id: 10, imgSrc: "po10.jpg", title: "Beautiful green valley in pop art Abstract style", price: "₹99,900" },
    { id: 11, imgSrc: "po11.jpg", title: "My Hair Style", price: "₹70,101" },
    { id: 12, imgSrc: "po12.jpg", title: "27's CLUB", price: "₹1,01,666" }
];


// // Function to create a product card
// function createProductCard(product) {
    // const productCard = document.createElement('div');
    // productCard.classList.add('product-card');

    // const productImg = document.createElement('img');
    // productImg.src = product.imgSrc;
    // productImg.alt = product.title;
    // productCard.appendChild(productImg);

    // const productTitle = document.createElement('p');
    // productTitle.classList.add('product-title');
    // productTitle.textContent = product.title;
    // productCard.appendChild(productTitle);

    // const productPrice = document.createElement('p');
    // productPrice.classList.add('product-price');
    // productPrice.textContent = product.price;
    // productCard.appendChild(productPrice);

    // const addButton = document.createElement('button');
    // addButton.textContent = 'Add to Cart';
    // productCard.appendChild(addButton);

    // return productCard;
// }

// // Function to populate products in the grid
// function populateProducts() {
    // const productGrid = document.querySelector('.product-grid');

    // // Clear existing products to avoid duplicates
    // productGrid.innerHTML = '';

    // products.forEach(product => {
        // const productCard = createProductCard(product);
        // productGrid.appendChild(productCard);
    // });
// }

// // Initialize product grid on page load
// document.addEventListener('DOMContentLoaded', populateProducts);


function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImg = document.createElement('img');
    productImg.src = product.imgSrc;
    productImg.alt = product.title;
    productCard.appendChild(productImg);

    const productTitle = document.createElement('p');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = product.price;
    productCard.appendChild(productPrice);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
        console.log("Add button clicked for product:", product);
        addToCart(product);
    });
    productCard.appendChild(addButton);

    return productCard;
}

function populateProducts() {
    const productGrid = document.querySelector('.product-grid');

    // Clear existing products to avoid duplicates
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Initialize product grid on page load
document.addEventListener('DOMContentLoaded', populateProducts);



