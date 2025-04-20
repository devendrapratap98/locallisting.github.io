// Sample data for listings (enhanced with more details)
const listingsData = [
    {
        id: 1,
        name: "Ramesh Farmer",
        category: "farmers",
        description: "Organic vegetable farmer with fresh produce available daily. Specializing in tomatoes, cucumbers, and leafy greens. All produce is grown without chemical pesticides or fertilizers.",
        location: "Village 1",
        address: "Near the temple, West side of village",
        contact: "9876543210",
        whatsapp: "9876543210",
        products: ["Tomatoes", "Cucumbers", "Spinach", "Eggplant"],
        timing: "6:00 AM - 6:00 PM daily",
        since: "2015",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        additionalImages: [
            "https://images.unsplash.com/photo-1594282416546-6e6a3b6d60c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ]
    },
    {
        id: 2,
        name: "Village Grocery Store",
        category: "shops",
        description: "All daily necessities available at reasonable prices. We stock fresh produce, grains, spices, and household items. Credit available for regular customers.",
        location: "Village 2",
        address: "Main market, near bus stand",
        contact: "9876543211",
        whatsapp: "9876543211",
        products: ["Rice", "Wheat flour", "Oil", "Spices", "Soaps", "Snacks"],
        timing: "7:00 AM - 9:00 PM, closed on Sundays",
        since: "1998",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        additionalImages: [
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1488459716781-31db525def45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        ]
    },
    // ... (other listings with similar enhanced details)
];

// DOM Elements
const listingContainer = document.getElementById('listing-container');
const listingForm = document.getElementById('listing-form');
const categoryFilter = document.getElementById('category-filter');
const locationFilter = document.getElementById('location-filter');
const notification = document.getElementById('notification');
const modal = document.getElementById('listing-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

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
    
    // Modal close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
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
                <p>${truncateDescription(listing.description)}</p>
                <div class="listing-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${listing.location}</span>
                    <span><i class="fas fa-phone"></i> ${listing.contact}</span>
                </div>
                <button class="view-details" data-id="${listing.id}">View Details</button>
            </div>
        `;
        
        listingContainer.appendChild(listingCard);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const listingId = parseInt(this.getAttribute('data-id'));
            showListingDetails(listingId);
        });
    });
}

// Truncate description for card view
function truncateDescription(description, maxLength = 100) {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
}

// Show full listing details in modal
function showListingDetails(listingId) {
    const listing = listingsData.find(item => item.id === listingId);
    
    if (!listing) {
        showNotification('Listing details not found', 'error');
        return;
    }
    
    modalContent.innerHTML = `
        <div class="listing-full">
            <div class="listing-full-image" style="background-image: url('${listing.image}')"></div>
            <div class="listing-full-details">
                <h2>${listing.name}</h2>
                
                <div class="listing-full-meta">
                    <div><i class="fas fa-map-marker-alt"></i> ${listing.location}</div>
                    <div><i class="fas fa-phone"></i> ${listing.contact}</div>
                    <div><i class="fas fa-clock"></i> ${listing.timing}</div>
                    <div><i class="fas fa-calendar-alt"></i> Since ${listing.since}</div>
                </div>
                
                <div class="listing-full-description">
                    <h3>About</h3>
                    <p>${listing.description}</p>
                    
                    ${listing.products ? `
                    <h3>Products/Services</h3>
                    <ul class="products-list">
                        ${listing.products.map(product => `<li>${product}</li>`).join('')}
                    </ul>
                    ` : ''}
                    
                    <h3>Location</h3>
                    <p>${listing.address}</p>
                </div>
                
                <div class="listing-actions">
                    <button class="action-button call-button" onclick="window.location.href='tel:${listing.contact}'">
                        <i class="fas fa-phone"></i> Call Now
                    </button>
                    
                    <button class="action-button whatsapp-button" onclick="window.open('https://wa.me/91${listing.whatsapp}?text=Hello%20${encodeURIComponent(listing.name)}%20from%20Village%20Connect')">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    
                    <button class="action-button directions-button" onclick="showDirections('${listing.address}, ${listing.location}')">
                        <i class="fas fa-directions"></i> Get Directions
                    </button>
                </div>
            </div>
        </div>
        
        ${listing.additionalImages && listing.additionalImages.length > 0 ? `
        <div class="additional-images">
            <h3>More Photos</h3>
            <div class="image-gallery">
                ${listing.additionalImages.map(img => `
                <div class="gallery-image" style="background-image: url('${img}')"></div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
}

// Show directions (would integrate with maps in real implementation)
function showDirections(address) {
    alert(`Directions to: ${address}\n\nIn a real implementation, this would open Google Maps with the location.`);
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
        address: location, // In real app would have separate address field
        contact,
        whatsapp: contact,
        products: [],
        timing: "9:00 AM - 6:00 PM",
        since: new Date().getFullYear().toString(),
        image: photo ? URL.createObjectURL(photo) : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        additionalImages: []
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
