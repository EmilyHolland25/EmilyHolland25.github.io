document.addEventListener("DOMContentLoaded", () => {

	 AOS.init();

	/* ------ STICKY HEADER --------- */
	
const header = document.querySelector('header');
const arrowUp = document.querySelector('.arrow-up');
const logo = document.querySelector('.logo');

let prevScrollpos = window.pageYOffset;

window.addEventListener("scroll", () => {
	// Add sticky class to give background and less padding
	header.classList[window.scrollY > 1 ? 'add' : 'remove']('sticky');

	// Slide up and hide the header if user scrolls down but show again if user scrolls up
	const currentScrollPos = window.pageYOffset;
	header.classList[(prevScrollpos < currentScrollPos && window.scrollY > 120) ? 'add' : 'remove']('hidden');

	// Show/hide back to top button
	if (arrowUp) {
		arrowUp.classList[window.scrollY > 500 ? 'add' : 'remove']('show');
	}

	prevScrollpos = currentScrollPos;
});

// Back to top functionality
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};

if (arrowUp) {
	arrowUp.addEventListener('click', scrollToTop);
}

if (logo) {
	logo.addEventListener('click', scrollToTop);
}

	/* ------ MOBILE MENU --------- */

	const mobMenuBtn = document.querySelector('.mobile-menu-button');
	const mobMenu = document.querySelector('.mobile-menu');
	mobMenuBtn.addEventListener("click", () => {
		mobMenuBtn.classList.toggle('open');
		if (mobMenuBtn.classList.contains('open')) {
      
			mobMenu.classList.add('active');
			mobMenu.style.height = 'auto';
	  
			var height = mobMenu.clientHeight + 'px';
	  
			mobMenu.style.height = '0px';
	  
			setTimeout(function () {
			  mobMenu.style.height = height;
			}, 0);
			
		  } else {
			
			mobMenu.style.height = '0px';
	  
			mobMenu.addEventListener('transitionend', function () {
			  mobMenu.classList.remove('active');
			}, {
			  once: true
			});
			
		  }

	});




// When page is fully loaded
window.addEventListener("load", () => {


	
	
});

});



// When window is resized
window.addEventListener('resize', breakpointChecker);





