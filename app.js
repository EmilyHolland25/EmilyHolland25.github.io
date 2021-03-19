/*jslint browser*/
/*global window*/

var modal = document.querySelector('.modal');
var previews = document.querySelectorAll('.gallery img');
var original = document.querySelector(".fullImage");
var imgText = document.querySelector(".caption");

previews.forEach(preview => {
  preview.addEventListener('click', () = > {
    modal.classList.add("open");
    original.classList.add("open");
    const originalSrc = preview.getAttribute('data-original');
    original.src = `./img/${originalSrc}`;
    const altText = preview.alt;
    imgText.textContent = altText;
  });
});

modal.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')){
    modal.classList.remove("open");
    original.classList.remove("open");
  }
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
