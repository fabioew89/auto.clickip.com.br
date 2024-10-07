const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
event.preventDefault(); // Prevent default form submission

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Replace with your actual validation logic (e.g., backend API call)

  if (username === 'admin' && password === 'admin') {

  // Redirect to the successful login page

    window.location.href = 'sw.html';
  } 
  else if (username === 'suporte' && password === 'D3s3mb0l&0') {

    // Redirecionar para outra página
    
    window.location.href = 'sw.html';
  }

  else {
    // Display error message

    errorMessage.textContent = 'Usuário ou senha inválidos.';
    errorMessage.classList.add('error'); // Add error styling
  
    // Hide the message after 3 seconds

    setTimeout(() => {
      errorMessage.textContent = ''; // Clear the message
      errorMessage.classList.remove('error'); // Remove error styling
    }, 2000); // Adjust the delay (2 seconds in this example)
  }
});

const container = document.getElementById('textbox-container');

// Function to simulate user input

function simulateInput(text) {
  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('textbox-content'); // Add CSS class for styling
  container.appendChild(span);
}

// Simulate initial content (optional)

simulateInput('Initial Text');

// Simulate user typing (replace with your event listener logic)

const userInput = prompt('Enter some text:'); // Replace with actual user input method
simulateInput(userInput);
