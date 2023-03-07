function GetPastEstimations() {
// Make a fetch request to retrieve the database.json file
fetch('http://localhost:3001/estimations')

  .then(response => response.json()) // Once the response is received, convert it to JSON format
  .then(data => { // Once the data is received, process it
    const userId = localStorage.getItem('userId')
    const userAData = getUserData(userId, data); // Get the data for authenticated user using the getUserData function
    const container = document.getElementById('past-est-container'); // Get the container element where the estimation divs will be added

    // Loop through each estimation data and create a div element for it
    userAData.forEach(datum => {
      const div = createEstimationDiv(datum);
      container.appendChild(div); // Add the div element to the container element
    });
  })
  
  .catch(error => console.error(`Request failed: ${error}`));  // If there's an error with the request, log an error message to the console

// This function takes a userId and data object as input, and returns an array of estimation data for that user
function getUserData(userId, data) {
  return data.filter(datum => datum.user === userId);
}

// This function takes an estimation datum object as input, and returns a div element containing the estimation data
function createEstimationDiv(datum) {
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const squareMetersP = document.createElement('p');
  const numBedroomsP = document.createElement('p');
  const cityP = document.createElement('p');
  const budgetP = document.createElement('p');
  const estRangeP = document.createElement('p');

  div.setAttribute('id', 'past-est');

  h2.textContent = `Estimation n. ${datum.est_id}`;
  squareMetersP.textContent = `Square meters: ${datum.square_meters}`;
  numBedroomsP.textContent = `Number of bedrooms: ${datum.num_bedrooms}`;
  cityP.textContent = `City: ${datum.city}`;
  budgetP.textContent = `Budget: ${datum.budget}`;
  estRangeP.textContent = `Estimation range: \u20AC ${datum.estimation_range[0]} - \u20AC ${datum.estimation_range[1]}`;

  div.appendChild(h2);
  div.appendChild(squareMetersP);
  div.appendChild(numBedroomsP);
  div.appendChild(cityP);
  div.appendChild(budgetP);
  div.appendChild(estRangeP);

  return div;
}
}

document.addEventListener("DOMContentLoaded", GetPastEstimations())

