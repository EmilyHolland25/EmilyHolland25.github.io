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
