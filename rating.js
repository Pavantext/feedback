const facilities = [
    "Ticketing process",
    "Cleanliness",
    "Staff behavior",
    "Parking facility",
    "Security arrangements",
    "Information boards",
    "Food court",
    "Washroom facility",
    "Overall experience"
];

function createRatingRow(facility) {
    return `
        <div class="rating-row">
            <h2>${facility}</h2>
            <div class="star-rating">
                ${Array(5).fill().map((_, index) => `
                    <div class="star" data-rating="${5 - index}">
                        <img src="./StarOut.svg" alt="star">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function initializeRatings() {
    const container = document.getElementById('rating-container');
    container.innerHTML = facilities.map(createRatingRow).join('');

    // Add hover and click effect for each star-rating group
    document.querySelectorAll('.rating-row .star-rating').forEach(starRating => {
        const stars = starRating.querySelectorAll('.star');
        let selectedRating = 0;  // Track selected rating for each group
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                if (!selectedRating) {  // Only show hover effect if no rating is selected
                    const rating = parseInt(star.dataset.rating);
                    stars.forEach(s => {
                        const starRating = parseInt(s.dataset.rating);
                        if (starRating > rating) {
                            s.querySelector('img').src = './StarOut.svg';
                        } else {
                            s.querySelector('img').src = './StarFill.svg';
                        }
                    });
                }
            });
            
            star.addEventListener('mouseout', () => {
                if (!selectedRating) {  // Only clear stars if no rating is selected
                    stars.forEach(s => {
                        s.querySelector('img').src = './StarOut.svg';
                    });
                } else {  // Maintain selected stars
                    stars.forEach(s => {
                        const starRating = parseInt(s.dataset.rating);
                        if (starRating > selectedRating) {
                            s.querySelector('img').src = './StarOut.svg';
                        } else {
                            s.querySelector('img').src = './StarFill.svg';
                        }
                    });
                }
            });

            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                if (selectedRating === rating) {  // Clicking the same star again clears the selection
                    selectedRating = 0;
                    stars.forEach(s => {
                        s.querySelector('img').src = './StarOut.svg';
                    });
                } else {  // Set new rating
                    selectedRating = rating;
                    stars.forEach(s => {
                        const starRating = parseInt(s.dataset.rating);
                        if (starRating > rating) {
                            s.querySelector('img').src = './StarOut.svg';
                        } else {
                            s.querySelector('img').src = './StarFill.svg';
                        }
                    });
                }
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRatings); 