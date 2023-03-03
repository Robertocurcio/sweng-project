document.addEventListener("DOMContentLoaded", function() {

  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const url = "server.py";
 

  // Register form submit event
  registerForm.addEventListener("submit",  (event) => {
    event.preventDefault(); // prevents the default form submission behavior

    const formData = new FormData(registerForm);

    // check for empty values and display an alert
    if (!formData.get("email") || !formData.get("password") || 
!formData.get("confirm-password")|| !formData.get("name")|| !formData.get("surname")) {
      alert("Please fill out all required fields.");
      return;
    }

    // check if passwords match and display an alert
    if (formData.get("password") !== formData.get("confirm-password")) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // POST request to register the user
    fetch(url, {
      method: "POST", 
      headers: { //what kind of data we are sending
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        request: "register",
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname")
      })
    })
      .then((response) => {
        if (response.status === 409){
          alert("User already registered")
        }
        else{
        //if the response is ok
        alert("Registration successful. Please log in to continue.")};
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  });

    // LOGIN form submit event
    loginForm.addEventListener("submit",  (event) => {
      event.preventDefault(); // prevents the default form submission behavior
  
      const formData = new FormData(loginForm);
  
      // check for empty values and display an alert
      if (!formData.get("email") || !formData.get("password")) {
        alert("Please fill out all required fields.");
        return;
      }
  
  
      // POST request to register the user
      fetch(url, {
        method: "POST", 
        headers: { //what kind of data we are sending
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          request: "login",
          email: formData.get("email"),
          password: formData.get("password"),
        })
      })
        .then((response) => {
          if (response.status === 401){
            alert("The password inserted doesn't match")
          }
          if (response.status === 404){
            alert("User not found")
          }
          if ( response.status === 200){
          //if the response is ok
          alert("User logged")};
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  });
  

