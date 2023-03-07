function GetPastEstimations() {
  // Get the container element where the estimation divs will be added
  const container = document.getElementById('past-est-container');

  // Keep track of the estimation IDs that have already been added to the container
  const existingEstIds = new Set();
  function getUserData(userId, data) {
      return data.filter(datum => datum.user === userId);
    }
  function updatePastEstimations() {
    // Make a fetch request to retrieve the database.json file
    fetch('http://localhost:3001/estimations')
      .then(response => response.json()) // Once the response is received, convert it to JSON format
      .then(data => { // Once the data is received, process it
        const userId = localStorage.getItem('userId')
        const userAData = getUserData(userId, data); // Get the data for authenticated user using the getUserData function

        // Loop through each estimation data that hasn't already been added to the container and create a div element for it
        userAData.filter(datum => !existingEstIds.has(datum.est_id)).forEach(datum => {
          const div = createEstimationDiv(datum);
          container.appendChild(div); // Add the div element to the container element
          existingEstIds.add(datum.est_id); // Add the estimation ID to the set of existing IDs
        });
      })
      .catch(error => console.error(`Request failed: ${error}`));  // If there's an error with the request, log an error message to the console
  }
  function createEstimationDiv(datum) {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const squareMetersP = document.createElement('p');
      const numBedroomsP = document.createElement('p');
      const cityP = document.createElement('p');
      const budgetP = document.createElement('p');
      const estRangeP = document.createElement('p');
    
      div.setAttribute('id', `past-est-${datum.est_id}`);
      div.setAttribute('class', 'past-est');

    
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
  updatePastEstimations(); // Call the function once to populate the container with initial data

  setInterval(updatePastEstimations, 5000); // Call the function every 5 seconds to update the container with new data
}

document.addEventListener("DOMContentLoaded", GetPastEstimations);
