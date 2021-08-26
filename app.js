/*jslint browser*/
/*global window*/


// Nav bar
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navLinks');
  const links = document.querySelectorAll('.navLinks li');


  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

  links.forEach((link, index) => {
    if(link.style.animation){
      link.style.animation = '';
    } else {
      link.style.animation = 'navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s';
    };
  });
  // Burger animation
burger.classList.toggle('toggle');

  });

}


navSlide();

// modal image
const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.polaroidImg');
const original = document.querySelector('.fullImage');
const imgText = document.querySelector('.caption');

previews.forEach(preview => {
  preview.addEventListener('click', () => {
    modal.classList.add("open");
    original.classList.add("open");

    const originalSrc = preview.getAttribute('data-original');
    original.src = originalSrc;
  });
});

modal.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')){
    modal.classList.remove("open");
    original.classList.remove("open");

  }
});

// Email Modal
const emailModal = document.getElementById("emailModal");
const openBtn = document.querySelector('.emailBtn');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
  emailModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if(e.target === emailModal) {
    emailModal.style.display = 'none';
  };
});

// form validation
const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");

function showError(input, message){
  const formValidation = input.parentElement;
  formValidation.className = 'form-validation error';

  const errorMessage = formValidation.querySelector('p');
  errorMessage.innerText = message;
};

function showValid(input) {
  const formValidation = input.parentElement;
  formValidation.className = 'form-validation valid';
};

function checkRequired(inputArr) {
  inputArr.forEach(function(input){
    if(input.value.trim() === ''){
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showValid(input);
    }
  });
};

function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([name, email]);
});


// Animations
const title = document.querySelector(".title");
const image = document.querySelector('.openImage');
const logo = document.querySelector('.logo');

// function typing(){
//   const texts = ['Developer', 'Designer'];
//   let count = 0;
//   let index = 0;
//   let currentText = '';
//   let letter = '';
//   let wait = parseInt(wait, 10);
//   let isDeleting = false;
//
//   (function type(){
//     if(count === texts.length){
//       count = 0;
//     }
//     currentText = texts[count];
//     letter = currentText.slice(0, ++index);
//
//     document.querySelector('.typing').textContent = letter;
//     if(letter.length === currentText.length){
//       count++;
//       index = 0;
//     }
//     setTimeout(type, 120);
//   }());
// }
//
// typing();
