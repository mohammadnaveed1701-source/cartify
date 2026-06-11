// Search functionality
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-ion i'); // The magnifying glass icon
const boxes = document.querySelectorAll('.box, .boxes');

function filterProducts() {
    const query = searchInput.value.toLowerCase();
    boxes.forEach(box => {
        const title = box.querySelector('p b') ? box.querySelector('p b').textContent.toLowerCase() : '';
        const description = box.textContent.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}

if (searchButton) {
    searchButton.addEventListener('click', filterProducts);
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.nav-cart');
const cartCount = document.createElement('span');
cartCount.className = 'cart-count';
cartCount.textContent = cart.length;
cartIcon.appendChild(cartCount);

function updateCartDisplay() {
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const box = e.target.closest('.box, .boxes');
        const title = box.querySelector('p b').textContent;
        const item = { title, quantity: 1 };
        const existing = cart.find(i => i.title === title);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(item);
        }
        updateCartDisplay();
        alert(`${title} added to cart!`);
    }
});

// For demo, add "Add to Cart" buttons to each box
boxes.forEach(box => {
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.className = 'add-to-cart';
    box.appendChild(button);
});

// Make all images clickable
document.querySelectorAll('img').forEach(img => {
    if (img.alt === 'america flag') return;

    const a = document.createElement('a');
    a.href = '#';
    a.style.display = 'inline-block'; 
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);

    // Add click event to add to cart
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const box = img.closest('.box, .boxes');
        if (box) {
            const title = box.querySelector('p b').textContent;
            const item = { title, quantity: 1 };
            const existing = cart.find(i => i.title === title);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push(item);
            }
            updateCartDisplay();
            alert(`${title} added to cart via image click!`);
        }
    });
});

// Make all anchor tags functional 
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        if (anchor.href === '#' || anchor.href === window.location.href + '#') {
            e.preventDefault();
            alert('Link clicked: ' + anchor.textContent.trim());
            // Or redirect to a page, e.g., window.location.href = 'https://www.amazon.com';
        }
    });
});

// Cart modal or simple display
cartIcon.addEventListener('click', () => {
    let cartItems = 'Your Cart:\n';
    cart.forEach(item => {
        cartItems += `${item.title} - Qty: ${item.quantity}\n`;
    });
    if (cart.length === 0) {
        cartItems = 'Your cart is empty.';
    }
    alert(cartItems);
});

// Responsive navbar toggle 
const navPanel = document.querySelector('.nav-panel');
const menuToggle = document.querySelector('.panel-all'); 

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navPanel.classList.toggle('active');
    });
}

// Smooth scroll for links 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top functionality
const backToTop = document.querySelector('.foot-panel1');
if (backToTop) {
    backToTop.style.cursor = 'pointer';
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
