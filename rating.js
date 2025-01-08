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

const ratings = ["POOR", "FAIR", "GOOD", "VERY GOOD", "EXCELLENT"];

function createRatingRow(facility) {
    return `
        <div class="rating-row">
            <h2>${facility}</h2>
            <div class="star-rating">
                ${ratings.map((rating, index) => `
                    <div class="star" data-rating="${5 - index}">
                        <img src="./StarOut.svg" alt="star">
                        <p>${rating}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function initializeRatings() {
    const container = document.getElementById('rating-container');
    container.innerHTML = facilities.map(createRatingRow).join('');

    // Add event listeners to all stars
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.dataset.rating);
            const starRating = star.closest('.star-rating');
            const starsInThisRow = starRating.querySelectorAll('.star');
            
            starsInThisRow.forEach(s => {
                const starRating = parseInt(s.dataset.rating);
                if (starRating > rating) {
                    s.querySelector('img').src = './StarOut.svg';
                } else {
                    s.querySelector('img').src = './StarFill.svg';
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            const starRating = star.closest('.star-rating');
            const starsInThisRow = starRating.querySelectorAll('.star');
            starsInThisRow.forEach(s => {
                s.querySelector('img').src = './StarOut.svg';
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRatings); 