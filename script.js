// Sample data for listings
const listingsData = [
    {
        id: 1,
        name: "Ramesh Farmer",
        category: "farmers",
        description: "Organic vegetable farmer with fresh produce available daily",
        location: "Village 1",
        contact: "9876543210",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Village Grocery Store",
        category: "shops",
        description: "All daily necessities available at reasonable prices",
        location: "Village 2",
        contact: "9876543211",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Handicraft Center",
        category: "handicrafts",
        description: "Beautiful handmade baskets, pottery, and textiles",
        location: "Village 1",
        contact: "9876543212",
        image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Village Mechanic",
        category: "services",
        description: "Bicycle and motorcycle repairs at your doorstep",
        location: "Village 3",
        contact: "9876543213",
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Harvest Festival",
        category: "events",
        description: "Annual village harvest festival with food, music, and dance",
        location: "Village 2",
        contact: "9876543214",
        date: "2023-11-15",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "Dairy Farm",
        category: "farmers",
        description: "Fresh milk, curd, and ghee available daily",
        location: "Village 3",
        contact: "9876543215",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// DOM Elements
const listingContainer = document.getElementById('listing-container');
const listingForm = document.getElementById('listing-form');
const categoryFilter = document.getElementById('category-filter');
const locationFilter = document.getElementById('location-filter');
const notification = document.getElementById('notification');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayListings(listingsData);
    
    // Form submission
    listingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewListing();
    });
    
    // Filter event listeners
    categoryFilter.addEventListener('change', filterListings);
    locationFilter.addEventListener('change', filterListings);
});

// Display listings
function displayListings(listings) {
    listingContainer.innerHTML = '';
    
    if (listings.length === 0) {
        listingContainer.innerHTML = '<p class="no-results">No listings found. Please try different filters.</p>';
        return;
    }
    
    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        listingCard.innerHTML = `
            <div class="listing-image" style="background-image: url('${listing.image}')"></div>
            <div class="listing-details">
                <h4>${listing.name}</h4>
                <p>${listing.description}</p>
                <div class="listing-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${listing.location}</span>
                    <span><i class="fas fa-phone"></i> ${listing.contact}</span>
                </div>
            </div>
        `;
        
        listingContainer.appendChild(listingCard);
    });
}

// Filter listings based on category and location
function filterListings() {
    const category = categoryFilter.value;
    const location = locationFilter.value;
    
    let filteredListings = listingsData;
    
    if (category !== 'all') {
        filteredListings = filteredListings.filter(listing => listing.category === category);
    }
    
    if (location !== 'all') {
        filteredListings = filteredListings.filter(listing => listing.location === location);
    }
    
    displayListings(filteredListings);
}

// Add a new listing
function addNewListing() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const contact = document.getElementById('contact').value;
    const photo = document.getElementById('photo').files[0];
    
    // Simple validation
    if (!name || !category || !description || !location || !contact) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Create new listing object
    const newListing = {
        id: listingsData.length + 1,
        name,
        category,
        description,
        location,
        contact,
        image: photo ? URL.createObjectURL(photo) : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };
    
    // Add to our data (in a real app, this would be an API call)
    listingsData.unshift(newListing);
    
    // Reset form
    listingForm.reset();
    
    // Show success message
    showNotification('Listing added successfully!');
    
    // Update the displayed listings
    filterListings();
    
    // Scroll to listings
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = 'notification show';
    
    if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#4CAF50';
    }
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

// For category cards click
function filterByCategory(category) {
    categoryFilter.value = category;
    filterListings();
}
