document.addEventListener("DOMContentLoaded", function() {

  const registerForm = document.getElementById("register-form");
  // const loginForm = document.getElementById("login-form");
 

  // Register form submit event
  registerForm.addEventListener("submit",  (event) => {
    event.preventDefault(); // prevents the default form submission behavior

    const formData = new FormData(registerForm);

//     // check for empty values and display an alert
//     if (!formData.get("email") || !formData.get("password") || 
// !formData.get("confirm_password")|| !formData.get("name")|| !formData.get("surname")) {
//       alert("Please fill out all required fields.");
//       return;
//     }

    // // check if passwords match and display an alert
    // if (formData.get("password") !== formData.get("confirm_password")) {
    //   alert("Passwords do not match. Please try again.");
    //   return;
    // }

    // POST request to register the user
    fetch('http://localhost:5050/accounts', {
      method: "POST", 
      headers: { //what kind of data we are sending
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "register",
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
        else {
          //if the response is ok
          alert("Registration successful. Please log in to continue.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  });
  });
  
  
//                                  /*MANCA ANCORA DA COMPLETARE */
  
//   // Login form submit event
//   loginForm.addEventListener("submit", async (event) => {
//     event.preventDefault(); // prevents the default form submission 
// behavior

//     const formData = new FormData(loginForm);

//     // check for empty values and display an alert
//     if (!formData.get("username") || !formData.get("password")) {
//       alert("Please fill out all required fields.");
//       return;
//     }

//     // POST request to login the user
//     try {
//       const response = await fetch(loginUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: formData.get("username"),
//           password: formData.get("password")
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       window.location.href = "/index.html"; // redirect to index.html upon 
// //successful login
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Incorrect username or password. Please try again.");
//     }
//   });

// });

