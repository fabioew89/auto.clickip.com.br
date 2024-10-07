/////////////////////////// Config input block for fields ///////////////////////////  

// circuitovpls input field exception

const elementIdsvpls = ['circuitovpls'];

for (const id of elementIdsvpls) {
  const element = document.getElementById(id);

  element.addEventListener('input', function() {
    const allowedChars = /[A0-Z9_]/; // Allowed characters (adjust as needed)
    let newInput = '';

    for (let char of this.value) { // Use 'this' to access current element's value
      if (allowedChars.test(char)) {
        newInput += char;
      }
    }
    element.value = newInput;

  });
}

// clientvpls input field exception

const clientevpls = document.getElementById('clientevpls');
clientevpls.addEventListener('input', function() {
  const allowedChars = /[A-Z0-9-_]/; // Allowed characters (adjust as needed)
  let newInput = '';

  for (let char of this.value) { // Use 'this' to access the cliente element's value
    if (allowedChars.test(char)) {
      newInput += char;
    }
  }
  clientevpls.value = newInput;

});

// vlanvpls input field exception

const vlanvpls = document.getElementById('numerovlanvpls');
const minValue = 2; // Minimum allowed value
const maxValue = 4094; // Maximum allowed value

vlanvpls.addEventListener('input', function () {
  let newValue = this.value; // Get current input

  // Remove all characters except numbers, ".", "+" or "-".
  newValue = newValue.replace(/[^0-9\-+\.]/g, "");

  // Check if the remaining value is a valid number within the range
  const parsedValue = parseFloat(newValue);
  if (isNaN(parsedValue) || parsedValue < minValue || parsedValue > maxValue) {
    newValue = ""; // Reset to empty if not a valid number or outside range
  }

  vlanvpls.value = newValue;

});

//IMPORTANT! SENDS USER DATA TO THE BACK-END FLASK SERVER (Can be used later to generate log)

/////////////////////////// Send data to webserver in VPLS tunneling ///////////////////////////  


function submitDataVpls() {

   // Get user input values and constants

   const circuitoInputvpls = document.getElementById("circuitovpls"); 
   const clienteInputvpls = document.getElementById("clientevpls"); 
   const VLANInputvpls = document.getElementById("numerovlanvpls"); 

//constants that will be used to get user input object value
   
   const circuitoValuevpls = circuitoInputvpls.value;
   const clienteValuevpls = clienteInputvpls.value;
   const VLANValuevpls = VLANInputvpls.value;

   //let instead of const on the dropdowns because it will be used many times in this function and it is not a fix value
  
     // Create a JSON object with user data

 const userDatavpls = {

   circuitovpls: circuitoValuevpls,
   clientevpls: clienteValuevpls,
   VLANvpls: VLANValuevpls,

 };

   // Convert the object to a JSON string

   const jsonString = JSON.stringify(userDatavpls);

   // Create an XMLHttpRequest object
 
   const xhr = new XMLHttpRequest();
 
   // Open a POST request
   xhr.open("POST", "/store-datavpls"); // Replace with your Flask route
 
   // Set the Content-Type header
 
   xhr.setRequestHeader("Content-Type", "application/json");
 
   // Handle the response (HTTP CODE 200 = SUCESSFULL)
 
   xhr.onload = function() {
     if (xhr.status === 200) {
       console.log("Data sent successfully!");
       window.location.href = "http://127.0.0.1:5000/vplstunnelingscript"
     } else {
       console.error("Error sending data:", xhr.statusText);
     }
   };
  
   
//logic to test if the fields have any content or not

if (circuitoValuevpls === "" || clienteValuevpls === "" || VLANValuevpls === "")
   {
    alert ("Por favor preencha os campos circuito, cliente, radioVLAN, radioCPE, quantidade de produtos (Serviços), NúmeroVLAN, Porta rede metro, porta CPE, velocidade da rede METRO e velocidade da rede CPE ");
    return; 
    // Prevent sending data if fields are empty
  }

  // Send the JSON data

  xhr.send(jsonString);

  // Redirects to the script page after sending json data to server-side
   
}











