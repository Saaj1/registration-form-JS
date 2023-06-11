// Get references to the form and input fields
const form = document.querySelector('.login');
const usernameInput = document.querySelector('#username input');
const emailInput = document.querySelector('#email input');
const passwordInput = document.querySelector('#password input');
const confirmPasswordInput = document.querySelector('#password2 input');

// Add event listener to the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Clear previous error messages
  clearErrorMessages();

  // Validate each field
  let isValid = true;

  // Validate name field (non-empty, only alphabet characters)
  const username = usernameInput.value.trim();
  if (!username) {
    displayErrorMessage(usernameInput, 'Name is required');
    isValid = false;
  } else if (!/^[A-Za-z]+$/.test(username)) {
    displayErrorMessage(usernameInput, 'Name should contain only alphabet characters');
    isValid = false;
  }

  // Validate email field (non-empty, proper email format)
  const email = emailInput.value.trim();
  if (!email) {
    displayErrorMessage(emailInput, 'Email is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    displayErrorMessage(emailInput, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate password field (non-empty, minimum length, requirements for numbers, uppercase, lowercase, and special characters)
  const password = passwordInput.value;
  if (!password) {
    displayErrorMessage(passwordInput, 'Password is required');
    isValid = false;
  } else if (!validatePassword(password)) {
    displayErrorMessage(passwordInput, 'Password should contain one number, one uppercase and lowercase character');
    isValid = false;
  }

  // Validate confirm password field (should match the password field)
  const confirmPassword = confirmPasswordInput.value;
  if (!confirmPassword) {
    displayErrorMessage(confirmPasswordInput, 'Confirm password is required');
    isValid = false;
  } else if (password !== confirmPassword) {
    displayErrorMessage(confirmPasswordInput, 'Passwords do not match');
    isValid = false;
  }

  if (isValid) {
    // Form passed validation, you can clear the form or redirect the user to a new page
    form.reset(); // Clear the form
    // Redirect the user to a new page: window.location.href = 'newpage.html';
    alert('Form submitted successfully!');
  }
});

// Function to validate email format using regular expression
function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

// Function to validate password format
function validatePassword(password) {
  // Password should have minimum length of 8 characters,
  // at least one digit, one uppercase, one lowercase letter,
  // and optionally one special character
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w.!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}


// Function to display error message next to the input field
function displayErrorMessage(inputField, message) {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  inputField.parentNode.appendChild(errorMessage);
}

// Function to clear all error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function(errorMessage) {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}
