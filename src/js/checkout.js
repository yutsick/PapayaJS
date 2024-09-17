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


// Form validation
const paymentButtons = document.querySelectorAll('.pay-apple, .pay-google, .pay-paypal, #bluesnap-submit');
const inputs = document.querySelectorAll('#checkoutForm input:not([type="checkbox"],#checkout__bluesnap-form input:not([type="checkbox"]');
const checkbox = document.querySelector('#checkoutForm .custom-checkbox');

// Checkbox on click validation
checkbox.addEventListener('click', checkTerms);

// Input on blur validation
inputs.forEach(input => {
    input.addEventListener('blur',  checkOnBlur );
});

// Button on click validation
paymentButtons.forEach(button => {
    button.addEventListener('click', checkOnSubmit );
});


function checkOnBlur(element) {
  const field = element.target;
  fieldsValidation(field);
}

function checkOnSubmit() {  
  const fields = document.querySelectorAll('#checkoutForm input.form-control, #checkoutForm .custom-checkbox');
  
  fields.forEach(function(field) {
    isValid = fieldsValidation(field);
     if (isValid) {
        alert('Form is valid!');
      }
    });

  };

  function fieldsValidation(field){
    let isValid = true;
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (field.id === 'pass') {

      const password = field.value;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

      if (!passwordRegex.test(password)) {

        field.classList.add('error');
        errorMessage.style.display = 'block';
        isValid = false;

      } else {

        field.classList.remove('error');
        errorMessage.style.display = 'none';

      }
    } else if (field.id === 'email') {

      const email = field.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        field.classList.add('error');
        errorMessage.style.display = 'block';
        isValid = false;

      } else {

        field.classList.remove('error');
        errorMessage.style.display = 'none';
      }

    } else if (field.value.trim() === '') {

      field.classList.add('error');
      errorMessage.style.display = 'block';
      isValid = false;

    } else if (field.type === 'checkbox') {

      isValid = checkTerms(checkbox);

    }  else {

      field.classList.remove('error');
      errorMessage.style.display = 'none';

    }
    return isValid;
  }

  function checkTerms(el){
    let field = (el.target) ? el.target : el;
    const errorMessageChkBox = field.parentElement.nextSibling;
    if(!field.checked){
        field.classList.add('error');
        errorMessageChkBox.style.display = 'block';
        return false;
    } else{
        field.classList.remove('error');
        errorMessageChkBox.style.display = 'none';
    }
  }

// -----------End vaidation


// Change Total price on tab click
document.querySelectorAll('[data-bs-toggle]').forEach(function (toggle) { 
    toggle.addEventListener('click', function () {
        const price = this.querySelector('.price-tab__price').textContent;
        document.querySelector('.checkout__total .price').textContent = price;
        console.log(price);
    });
});