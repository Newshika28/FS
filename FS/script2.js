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
        const listingLocation = listing.getAttribute('data-location').toLowerCase();
        const listingPrice = parseInt(listing.querySelector('p').textContent.split('₹')[1].replace(/,/g, ''));
        const roomsMatch = listing.querySelector('p').textContent.includes(rooms + ' Beds');

        const priceMatch = !price || listingPrice <= parseInt(price);
        const locationMatch = listingLocation.includes(location);

        if (locationMatch && priceMatch && roomsMatch) {
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
        // Redirect to the welcome page after successful login
        localStorage.setItem('username', username);
        window.location.href = 'welcome.html';       
    } else {
        document.getElementById('login-status').textContent = 'Invalid username or password.';
    }
});
