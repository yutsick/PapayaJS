function e(){event.preventDefault();let e=!0;document.querySelectorAll("#checkoutForm input.form-control:not(#card):not(#card_date):not(#card_cvv), #checkoutForm .custom-checkbox").forEach((function(s){const l=s.parentElement.querySelector(".error-message"),r=s.parentElement.nextSibling;if("pass"===s.id){const r=s.value;/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(r)?(s.classList.remove("error"),l.style.display="none"):(s.classList.add("error"),l.style.display="block",e=!1)}else if("email"===s.id){const r=s.value;/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)?(s.classList.remove("error"),l.style.display="none"):(s.classList.add("error"),l.style.display="block",e=!1)}else"checkbox"===s.type?s.checked?(s.classList.remove("error"),r.style.display="none"):(s.classList.add("error"),r.style.display="block",e=!1):""===s.value.trim()?(s.classList.add("error"),l.style.display="block",e=!1):(s.classList.remove("error"),l.style.display="none")})),e&&alert("Form is valid!")}document.querySelectorAll(".pay-apple, .pay-google, .pay-paypal").forEach(s=>{s.addEventListener("click",e)});