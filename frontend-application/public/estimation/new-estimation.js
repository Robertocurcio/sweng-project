document.addEventListener("DOMContentLoaded", function SendEstimationInputs() { //fired when HTML document has been FULLY parsed and loaded

  const form = document.getElementById("estimate-form");
  const url = "http://localhost:3001/estimation";

  //on submit of the form, the function is async
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); //prevents the default form submission behavior

    const formData = new FormData(form);

    //check for empty values, and displays an alert
    if (!formData.get("square_meters") || !formData.get("num_bedrooms") || !formData.get("city") || !formData.get("budget")) {
      alert("Please fill out all required fields.");
      return;
    }

    //POST request
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          square_meters: formData.get("square_meters"),
          num_bedrooms: formData.get("num_bedrooms"),
          city: formData.get("city"),
          budget: formData.get("budget")
        })
      });

      if (!response.ok) { //response.ok means status between 200-299
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      alert("Estimation request has been successful! \nCheck it on My Estimations")
      
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});