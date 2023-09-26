// function fetchAndGenerateCards(endpoint) {
//   fetch(`https://dummyjson.com/products/${endpoint}`)
//     .then(res => res.json())
//     .then(data => mapdatatohtml(data));
// }

// function mapdatatohtml(data) {
//   let dataforcards = document.querySelector(".dataforcards");

//   var mapping = `
//       <div class="col">
//         <div class="card border-dark .h-100 ">
//           <img src="${data.images[0]}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${data.title}</h5>
//             <p class="card-text">${data.description}</p>
//             </div>
//             <div class="card-footer">
//             <a href="https://shorturl.at/ptQZ7" class="btn text-sm-start  "target="_blank">Buy now!</a>
//             </div>
//         </div>
//       </div>
//       `
//   dataforcards.innerHTML += mapping;
  // Using += to Append: When you use += to modify the innerHTML, it appends the new HTML content to the existing content of the element. So, with each iteration of the loop, the HTML for a new card is added to the existing HTML within the dataforcards element without removing the previously added cards. 
// }


// for (i = 1; i <= 30; i++) {
//   fetchAndGenerateCards(i);

// }

function fetchAndGenerateCards(endpoint) {
  fetch(`https://dummyjson.com/products/${endpoint}`)
    .then(res => res.json())
    .then(data => mapDataToHtml(data));
}

function mapDataToHtml(data) {
  let dataForCards = document.querySelector(".dataforcards");

  let mapping = `
    <div class="col">
      <div class="card border-dark .h-100 ">
        <img src="${data.images[0]}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.description}</p>
        </div>
        <div class="card-footer">
          <a href="https://shorturl.at/ptQZ7" class="btn text-sm-start " target="_blank">Buy now!</a>
        </div>
      </div>
    </div>
  `;
  dataForCards.innerHTML += mapping;
}


const seeMoreButton = document.getElementById('show-more-button');
const showLessButton = document.getElementById('show-less-button');
let currentPage = 1; // Track the current page of cards
const cardsPerPage = 9; // Number of cards to load per page

function loadMoreCards() {
  currentPage++; // Increment the current page
  for (let i = 0; i < cardsPerPage; i++) {
    fetchAndGenerateCards(currentPage * cardsPerPage + i); // Fetch and generate more cards
  }
  showLessButton.style.display = 'block'; // Show the "Show Less" button
}

function showLessCards() {
  const cardsToRemove = document.querySelectorAll('.col:nth-child(n+10)');
  cardsToRemove.forEach(card => {
    card.remove(); // Remove the last 9 cards
  });
  currentPage--; // Decrement the current page
  if (currentPage === 1) {
    showLessButton.style.display = 'none'; // Hide the "Show Less" button when on the first page
  }
}

// Listen for the "See More" button click
seeMoreButton.addEventListener('click', loadMoreCards);

// Listen for the "Show Less" button click
showLessButton.addEventListener('click', showLessCards);

// Initial load
for (let i = 1; i <= cardsPerPage; i++) {
  fetchAndGenerateCards(i);
}
