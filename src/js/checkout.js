// bluesnap payment fields
const token = 'b44b553f82290ad50eaec4a9ab333c810b57eb2e00075eb061282694ce77d74f_';

function changeImpactedElement(tagId, removeClass = "", addClass = "") {

  const elements = document.querySelectorAll(`[data-bluesnap="${tagId}"]`);


  elements.forEach(element => {

    if (removeClass) {
      element.classList.remove(removeClass);
    }

    if (addClass) {
      element.classList.add(addClass);
    }
  });
}

bluesnap.hostedPaymentFieldsCreate({
  token: token,
  onFieldEventHandler: {
      onFocus: function (tagId) {
          changeImpactedElement(tagId, "", "hosted-field-focus");
      },
      onBlur: function (tagId) {
          changeImpactedElement(tagId, "hosted-field-focus");
      },
      onError: function (tagId, errorCode, errorDescription, eventOrigin) {
          const helpElement = document.querySelector(`#${tagId}-error`);
          if (helpElement) {
              helpElement.textContent = `${errorCode} - ${errorDescription} - ${eventOrigin}`;
          }
      },
      onType: function (tagId, cardType, cardData) {
          const cardLogo = document.getElementById("card-logo");
          if (cardLogo) {
              const img = cardLogo.querySelector("img");
              if (img) {
                  img.src = cardUrl[cardType];
              }
          }

      },
      onValid: function (tagId) {
          const helpElement = document.getElementById(tagId + "-help");
          if (helpElement) {
              helpElement.textContent = "";
          }
      }
  },
  hostedFields: {
      cardNumber: {
          selector: '#card-number',
          placeholder: 'Card Number'
      },
      expirationDate: {
          selector: '#card-expiration',
          placeholder: 'MM / YY'
      },
      securityCode: {
          selector: '#card-cvv',
          placeholder: 'CVV'
      }
  },
  style:{
    "input": {
      "font-size": "1rem",
      "font-family": "Poppins,sans-serif",
      "color": "#212529",
      "display": "block",
      'height': '40px',
    },

    "::placeholder": {
      "color": "#D1D3D3",
      "font-size": "clamp(14px, 3vw,16px)",
      "font-family": "Poppins,sans-serif",
    },
    
  },
    ccnPlaceHolder: "Enter Card Number",
    cvvPlaceHolder: "***",
    expPlaceHolder: "MM/YY"
});

document.querySelector('#bluesnap-submit').addEventListener('click', function (event) {

  bluesnap.hostedPaymentFieldsSubmitData(function(callback) {
    if (callback.error) {
      const errorArray = callback.error;
      errorArray.forEach(error => {
        const errorElement = document.getElementById(error.tagId + "-error");
        if (errorElement) {
          errorElement.textContent = `${error.errorCode} - ${error.errorDescription}`;
        }
      });
    } else {
      const cardData = callback.cardData;
      alert(
        `Card Type: ${cardData.ccType}\n` +
        `Last 4 Digits: ${cardData.last4Digits}\n` +
        `Issuing Country: ${cardData.issuingCountry}\n` +
        `Is Regulated Card: ${cardData.isRegulatedCard}\n` +
        `Card Sub Type: ${cardData.cardSubType}\n` +
        `Bin Category: ${cardData.binCategory}\n` +
        `Exp: ${cardData.exp}\n` +
        `after that I can call final submit`
      );
    }
  });
});

// End of bluesnap payment fields

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
// Change Total price on tab click
document.querySelectorAll('[data-bs-toggle]').forEach(function (toggle) { 
    toggle.addEventListener('click', function () {
        const price = this.querySelector('.price-tab__price').textContent;
        document.querySelector('.checkout__total .price').textContent = price;
        console.log(price);
    });
});