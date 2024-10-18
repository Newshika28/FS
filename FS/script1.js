// Carousel script
let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');

function showCarouselItem(index) {
    carouselItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

showCarouselItem(currentIndex);
setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showCarouselItem(currentIndex);
}, 3000); // Auto-change carousel every 3 seconds

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('search-location').value.toLowerCase();
    const price = document.getElementById('search-price').value;
    const type = document.getElementById('search-type').value.toLowerCase();
    const rooms = document.getElementById('search-rooms').value;

    const listings = document.querySelectorAll('.carousel-item');

    listings.forEach(listing => {
        const title = listing.querySelector('h3').textContent.toLowerCase();
        const priceMatch = !price || parseInt(listing.querySelector('p').textContent.split('$')[1].replace(/,/g, '')) <= parseInt(price);
        const roomsMatch = !rooms || listing.querySelector('p').textContent.includes(rooms + ' Beds');

        if (title.includes(location) && title.includes(type) && priceMatch && roomsMatch) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
});

// User authentication (simple login system)
const dummyUsers = {
    'testuser': 'password123'
};

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (dummyUsers[username] && dummyUsers[username] === password) {
        document.getElementById('login-status').textContent = 'Login successful! You can now save listings.';
        document.getElementById('login-status').style.color = 'green';
    } else {
        document.getElementById('login-status').textContent = 'Invalid username or password.';
    }
});
