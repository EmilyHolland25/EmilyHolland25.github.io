document.addEventListener("DOMContentLoaded", () => {

	

	/* ------ STICKY HEADER --------- */
	
	const header = document.querySelector('header');
	let prevScrollpos = window.pageYOffset;
	window.addEventListener("scroll", (e) => {
		// Add sticky class to give background and less padding
		header.classList[window.scrollY > 1 ? 'add' : 'remove']('sticky');
		// Slide up and hide the header if user scrolls down but show again if user scrolls up
		const currentScrollPos = window.pageYOffset;
		header.classList[(prevScrollpos < currentScrollPos && window.scrollY > 120) ? 'add' : 'remove']('hidden');
		prevScrollpos = currentScrollPos;
	});

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



	


	/* ------ CONTACT FORMS MENU --------- */

	const formNav = document.querySelector('.form-nav')
	if(formNav) {
		const formButtons = formNav.querySelectorAll('.form-nav li');
		console.log(formButtons);
		formButtons.forEach((formButton, idx) => {
			formButton.addEventListener("click", (event) => {
				const selectedForm = document.querySelector('.form-item');
				const newHeight = selectedForm.offsetHeight;
	
				// Dunno...
				gsap.to('.form-sections', {height: newHeight, duration: 1});
				gsap.to(formNav, { opacity: 0, x: "-100%", autoAlpha: 0, duration: 1 });
				gsap.to(selectedForm, { opacity: 1, x: "100%", autoAlpha: 1, duration: 1, delay: 1.5, })
				gsap.to(selectedForm, { position: 'static', duration: 0, x: "0%", delay: 2.5, });
				gsap.to('.form-sections', { height: 'auto', duration: 0, delay:2.5});
				gsap.to('.form-nav', { display: 'none', duration: 0, delay: 2.5});
				
	
			});
		});
	}
		
});


// When page is fully loaded
window.addEventListener("load", () => {

	

	/* ------ Dynamic Background Color Transitions --------- */

	// Store all elements where we want to change the bg color when scrolled into view
	const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
	
	// Loop through elements and add a scroll trigger to them
	scrollColorElems.forEach((colorSection, i) => {

		// Store the previous elements text and bg colors for if the user scrolls back up
		const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
		const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

		// Create scroll trigger when section is in view
		ScrollTrigger.create({
			trigger: colorSection,
			scroller: "body",
			start: "top 50%",
			onEnter: () => { // When we start the trigger
				gsap.to("body", {
					// Change data attributes on body element (we target this with CSS)
					backgroundColor: colorSection.dataset.bgcolor,
					color: colorSection.dataset.textcolor,
					overwrite: "auto",
				});
				document.querySelector('body').dataset.currentColor = colorSection.dataset.textcolor;
			},	
			onLeaveBack: () => { // When we scroll back above the trigger
				gsap.to("body", {
					// Re-instate previous color attributes
					backgroundColor: prevBg,
					color: prevText,
					overwrite: "auto",
				});
				document.querySelector('body').dataset.currentColor = prevText
			},
		});
	});


	/* ------ AOS REPLACEMENT (NEEDS CSS COUNTERPART) --------- */
	
	const animElements = gsap.utils.toArray('.anim');
	animElements.forEach((el) => {
		let offset;
		el.classList.contains('fade-up') ? offset = "100px" : offset = "100px"; 
		gsap.from(el, {
			scrollTrigger: {
				start: `${offset} bottom`,
				endTrigger:"html",
				end:"bottom top",
				trigger: el,
				toggleClass: 'enable',
				once: true,
			}
		});
	});

	
	/* ------ Projects Title Pinner --------- */

	const projectTitleStart = document.querySelector('.big-title.start');
	const projectTitleEnd = document.querySelector('.big-title.end');

	if(projectTitleStart && projectTitleEnd) {

		const scrollTriggerSettings = () => {
			gsap.to('.big-title.start', { 
				opacity: 0, 
				duration: 0.6, 
				immediateRender: false,
				scrollTrigger: {
					trigger: projectTitleStart,
					endTrigger: '.projects-wrap',
					pin: true,
					start: 'top top+=50',
					end: 'top+=200 top+=50',
					pinSpacing: false,
					scrub: true,
				}
			});
		};

		ScrollTrigger.matchMedia({
			// desktop
			"(min-width: 960px)": scrollTriggerSettings,
			// tablet
			"(min-width: 768px) and (max-width: 959px)":  scrollTriggerSettings,
			// mobile
			"(max-width: 767px)":  scrollTriggerSettings,
		});

			
		ScrollTrigger.matchMedia({
			// desktop
			"(min-width: 960px)": function() {
				gsap.from('.big-title.end', { 
					opacity: 0, 
					duration: 2, 
					immediateRender: false,
					scrollTrigger: {
						trigger: projectTitleEnd,
						endTrigger: '.band-projects',
						pin: true,
						start: 'top bottom-=300',
						end: 'bottom-=250 bottom-=300',
						pinSpacing: false,
						scrub: true,
						onLeave: () => projectTitleEnd.classList.toggle("ended"),
						onEnterBack: () => projectTitleEnd.classList.toggle("ended"),
					}
				});
			},
			// tablet
			"(min-width: 768px) and (max-width: 959px)": function() {
				gsap.from('.big-title.end', { 
					opacity: 0, 
					duration: 2, 
					immediateRender: false,
					scrollTrigger: {
						trigger: projectTitleEnd,
						endTrigger: '.band-projects',
						pin: true,
						start: 'top bottom-=200',
						end: 'bottom-=200 bottom-=200',
						pinSpacing: false,
						scrub: true,
						onLeave: () => projectTitleEnd.classList.toggle("ended"),
						onEnterBack: () => projectTitleEnd.classList.toggle("ended"),
					}
				});
			},
			// mobile
			"(max-width: 767px)": function() {
				gsap.from('.big-title.end', { 
					opacity: 0, 
					duration: 2, 
					immediateRender: false,
					scrollTrigger: {
						trigger: projectTitleEnd,
						endTrigger: '.band-projects',
						pin: true,
						start: 'top bottom-=200',
						end: 'bottom-=150 bottom-=200',
						pinSpacing: false,
						scrub: true,
						onLeave: () => projectTitleEnd.classList.toggle("ended"),
						onEnterBack: () => projectTitleEnd.classList.toggle("ended"),
					}
				});
			}
		});

	} // endif
	
	/* ------ Homepage Ticking Banner --------- */

	let ticker = document.getElementById("ticker-items");

	if(ticker) {

		ticker = ticker.cloneNode(true);

		for(i = 0; i < 3; i++) {
			document.querySelector(".band-ticker").appendChild(ticker);
		}
		TweenMax.to(
			'.ticker-outer', // Target of animation
			100, // Speed
			{
				x: -ticker.offsetWidth/2, // Move left by size of itself
				repeat: -1, // Repeat infinitely
				ease: Linear.easeNone, // Smooth linear ease (no ease in/out)
			}
		);

		let tickerTl = gsap.timeline({
			defaults: { overwrite: true },
			scrollTrigger: {
				trigger: '.band-ticker',
				//markers: true,
				scrub: true,
				end: '4000px',
			}
		});

		tickerTl.to('.band-ticker', {
			x: -ticker.offsetWidth, // Move left by size of itself
			ease: Linear.easeNone, // Smooth linear ease (no ease in/out)
		});

	} //endif

	// Fix for ScrollTrigger and Lazyloading images
	const allImages = document.querySelectorAll('.lazyload, .lazyloaded');
	let lockRefresh = false;
	allImages.forEach(image => {
		image.addEventListener("load", () => {
			if(lockRefresh !== true) {
				lockRefresh = true;
				setTimeout(() => {
					ScrollTrigger.refresh();
					lockRefresh = false;
				}, 800);
			}
			
		});
	});

	/* ------ Projects Hover Effect --------- */

	// Functions repurposed from https://nigelotoole.github.io/direction-reveal/

	const projectItems = document.querySelectorAll('.project-item .thumbnail-outer');
	let projectItemHovers = [];


	projectItems.forEach( item => {

		projectItemHovers.push(false);

		item.addEventListener("mouseenter", (e) => {
			projectItemHovers[item] = true;
			const dir = translateDirection(getDirection(e, item))+'-in';
			item.classList.remove('top-out', 'right-out', 'left-out', 'bottom-out', 'top-in', 'right-in', 'left-in', 'bottom-in');
			item.classList.add(dir);
		});

		item.addEventListener("mouseleave", (e) => {
			const dir = translateDirection(getDirection(e, item))+'-out';
			item.classList.remove('top-in', 'right-in', 'left-in', 'bottom-in');
			item.classList.add(dir);
			projectItemHovers[item] = false;
			if(projectItemHovers[item] == false) {
				setTimeout(function(){
					item.classList.remove('top-out', 'right-out', 'left-out', 'bottom-out');
				}, 300)
			}

		});
	});

	


	console.log(projectItemHovers);

	const getDirection = (e, item) => {
		 // Width and height of current item
		 let w = item.offsetWidth;
		 let h = item.offsetHeight;
		 let position = getPosition(item);
	 
		 // Calculate the x/y value of the pointer entering/exiting, relative to the center of the item.
		 let x = (e.pageX - position.x - (w / 2)) * (w > h ? (h / w) : 1);
		 let y = (e.pageY - position.y - (h / 2)) * (h > w ? (w / h) : 1);
	 
		 // Calculate the angle the pointer entered/exited and convert to clockwise format (top/right/bottom/left = 0/1/2/3). - https://stackoverflow.com/a/3647634
		 let d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
		 return d;
	};

	const switchCase = cases => defaultCase => key => key in cases ? cases[key] : defaultCase;

	const getPosition = (el) => {
		let xPos = 0;
		let yPos = 0;
		while (el) {
			xPos += (el.offsetLeft + el.clientLeft);
			yPos += (el.offsetTop + el.clientTop);
			el = el.offsetParent;
		}
		return { x: xPos, y: yPos };
	};
	
	const translateDirection = switchCase({
		0: 'top',
		1: 'right',
		2: 'bottom',
		3: 'left'
	})('top');

	
});


/* ------ SCREEN RESIZE FIX ------ */

// Function for force refreshing ScrollTrigger (accounting for CSS transitions causing layout changes taking extra time)
let currentBreakpoint;
let breakpointChecker = () => {
	if (window.matchMedia("(min-width: 960px)").matches && currentBreakpoint !== "desktop") {
		currentBreakpoint = "desktop";
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
			ScrollTrigger.refresh();
		}, 800);
	}
	if (window.matchMedia("(max-width: 959px) and (min-width: 768px)").matches && currentBreakpoint !== "tablet") {
		currentBreakpoint = "tablet";
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
			ScrollTrigger.refresh();
		}, 800);
	}
	if (window.matchMedia("(max-width: 767px)").matches && currentBreakpoint !== "mobile") {
		currentBreakpoint = "mobile";
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
			ScrollTrigger.refresh();
		}, 800);
	}
	
};

// When window is resized
window.addEventListener('resize', breakpointChecker);





