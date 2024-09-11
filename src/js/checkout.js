
const paymentButtons = document.querySelectorAll('.pay-apple, .pay-google, .pay-paypal');

paymentButtons.forEach(button => {
    button.addEventListener('click', checkFormFields );
});

function checkFormFields() {    
    event.preventDefault(); 
    let isValid = true;
     const fields = document.querySelectorAll('#checkoutForm input.form-control:not(#card):not(#card_date):not(#card_cvv), #checkoutForm .custom-checkbox');

   
    fields.forEach(function(field) {
      const errorMessage = field.parentElement.querySelector('.error-message');
      const errorMessageChkBox = field.parentElement.nextSibling;

      // Handle password validation separately
      if (field.id === 'pass') {
        const password = field.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  
        if (!passwordRegex.test(password)) {
          field.classList.add('error');
        //   errorMessage.textContent = 'Password must be 8-20 characters, contain at least one letter, one digit, and one special character.';
          errorMessage.style.display = 'block';
          isValid = false;
        } else {
          field.classList.remove('error');
        //   errorMessage.textContent = '';
          errorMessage.style.display = 'none';
        }
      }

       // Email validation
       else if (field.id === 'email') {
        const email = field.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          field.classList.add('error');
        //   errorMessage.textContent = 'Please enter a valid email address.';
          errorMessage.style.display = 'block';
          isValid = false;
        } else {
          field.classList.remove('error');
        //   errorMessage.textContent = '';
          errorMessage.style.display = 'none';
        }
      }

      // Handle checkbox validation separately
      else if (field.type === 'checkbox') {
        if(!field.checked){
            field.classList.add('error');
            // errorMessageChkBox.textContent = 'You must agree to the Terms & Conditions.';
            errorMessageChkBox.style.display = 'block';
            isValid = false;
        } else{
            field.classList.remove('error');
            // errorMessageChkBox.textContent = '';
            errorMessageChkBox.style.display = 'none';
        }
        
      }

      // Handle empty fields
      else if (field.value.trim() === '') {
        field.classList.add('error');
        // errorMessage.textContent = field.getAttribute('placeholder') + ' is required.';
        errorMessage.style.display = 'block';
        isValid = false;
      } else {
        // Remove error styles
        field.classList.remove('error');
        // errorMessage.textContent = '';
        errorMessage.style.display = 'none';
      }
    });
  
    if (isValid) {
      // Code for submitting form
      alert('Form is valid!');
    }
  };