var showHideButton = document.querySelector(".page-header__menu");
var mainMenu = document.querySelector(".page-header__nav");
// mainMenu.classList.toggle("show");
showHideButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    mainMenu.classList.toggle("show");
})
// showHideButton.classList.toggle("open");
showHideButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  showHideButton.classList.toggle("open");
})
