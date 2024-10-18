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

// Check for user login and display welcome message
window.addEventListener('load', () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('user-name').textContent = username;
        document.querySelector('.hero').style.display = 'none'; // Hide hero section after login
        document.getElementById('welcome').style.display = 'block'; // Show welcome section
    }
});

// Function to save favorite listings
function saveFavoriteListing(listing) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(listing);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Event listener to save favorite listings
const listingItems = document.querySelectorAll('.carousel-item');
listingItems.forEach(item => {
    const button = document.createElement('button');
    button.textContent = 'Save as Favorite';
    button.classList.add('btn');
    
    button.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        saveFavoriteListing(title);
        alert(`${title} has been saved to your favorites!`);
    });
    
    item.appendChild(button);
});

// Function to display user's favorite listings
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesSection = document.createElement('section');
    favoritesSection.classList.add('favorites');
    favoritesSection.innerHTML = `<h2>Your Favorite Listings</h2>`;
    
    favorites.forEach(favorite => {
        const favoriteItem = document.createElement('p');
        favoriteItem.textContent = favorite;
        favoritesSection.appendChild(favoriteItem);
    });
    
    document.body.appendChild(favoritesSection);
}

// Display favorites on the welcome page
window.addEventListener('load', () => {
    displayFavorites();
});

// Property recommendation based on browsing history
const recommendedListings = {
    'delhi': [
        { title: 'Luxury Villa in Delhi', price: '₹5,00,00,000' },
        { title: 'Cozy Apartment in Delhi', price: '₹2,50,00,000' },
    ],
    'mumbai': [
        { title: 'Sea View Apartment in Mumbai', price: '₹3,00,00,000' },
        { title: 'Modern Villa in Mumbai', price: '₹6,00,00,000' },
    ],
    'bangalore': [
        { title: 'Stylish House in Bangalore', price: '₹4,00,00,000' },
        { title: 'Charming Apartment in Bangalore', price: '₹1,50,00,000' },
    ]
};

function recommendProperties(location) {
    const recommendations = recommendedListings[location];
    if (recommendations) {
        const recommendationsSection = document.createElement('section');
        recommendationsSection.classList.add('recommendations');
        recommendationsSection.innerHTML = `<h2>Recommended Listings for ${location.charAt(0).toUpperCase() + location.slice(1)}</h2>`;
        
        recommendations.forEach(listing => {
            const listingItem = document.createElement('p');
            listingItem.textContent = `${listing.title} - ${listing.price}`;
            recommendationsSection.appendChild(listingItem);
        });

        document.body.appendChild(recommendationsSection);
    }
}

// Event listener for search functionality to recommend properties
document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('search-location').value.toLowerCase();
    recommendProperties(location); // Call recommendation function
});
