const radioContainers = document.querySelectorAll('.query-input');
const radioButtons = document.querySelectorAll('input[name="queryType"]');
const contactForm = document.getElementById('contactForm');

const firstName = document.getElementById('firstName');
const firstNameError = document.getElementById('firstNameError');

const lastName = document.getElementById('lastName');
const lastNameError = document.getElementById('lastNameError');

const emailAddress = document.getElementById('emailAddress');
const emailAddressError = document.getElementById('emailAddressError');

const queryTypeError = document.getElementById('queryTypeError');

const largeTextInput = document.getElementById('largeTextInput');
const largeTextError = document.getElementById('largeTextError');

const consentCheckbox = document.getElementById('consentCheckbox');
const consentError = document.getElementById('consentError');

const overlay = document.getElementById('overlay');

function handleSubmit(e) {
  e.preventDefault();

  firstNameError.classList.add('hidden');
  lastNameError.classList.add('hidden');
  emailAddressError.classList.add('hidden');
  queryTypeError.classList.add('hidden');
  largeTextError.classList.add('hidden');
  consentError.classList.add('hidden');

  firstName.classList.remove('error-border');
  lastName.classList.remove('error-border');
  emailAddress.classList.remove('error-border');
  largeTextInput.classList.remove('error-border');

  let isSelected = false;
  let errorsDetected = false;

  if (firstName.value.trim() === "") {
    firstNameError.classList.remove('hidden');
    firstName.classList.add('error-border');
    errorsDetected = true;
  } 

  if (lastName.value.trim() === "") {
    lastNameError.classList.remove('hidden');
    lastName.classList.add('error-border');
    errorsDetected = true;
  }

  if (emailAddress.value.trim() === "") {
    emailAddressError.classList.remove('hidden');
    emailAddress.classList.add('error-border');
    errorsDetected = true;
  } else {
    if (!testEmail(emailAddress.value)){
      emailAddressError.classList.remove('hidden');
      emailAddress.classList.add('error-border');
      errorsDetected = true;
    }
  }

  radioButtons.forEach(radio => {
    if (radio.checked) {
      isSelected = true;
    }
  });

  if(!isSelected) {
    queryTypeError.classList.remove('hidden');
    errorsDetected = true;
  }

  if (largeTextInput.value.trim() === "") {
    largeTextError.classList.remove('hidden');
    largeTextInput.classList.add('error-border');
    errorsDetected = true;
  }

  if (!consentCheckbox.checked) {
    consentError.classList.remove('hidden');
    errorsDetected = true;
  }

  if (!errorsDetected) {
    overlay.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 3000);

  }

}


function testEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


radioContainers.forEach(container => {
  container.addEventListener('click', () => {
      
      container.classList.add('query-active');

      const radioButton = container.querySelector('input[type="radio"]');
      if (radioButton) {
          radioButton.checked = true;
      }
  });
});


document.addEventListener('click', function(event) {
  
  const isClickInsideQueryInput = event.target.closest('.query-input');

  document.querySelectorAll('.query-input').forEach(container => {
      container.classList.remove('query-active');
  });
  
  if (isClickInsideQueryInput) {
      isClickInsideQueryInput.classList.add('query-active');
  }
});


document.addEventListener('submit', handleSubmit);