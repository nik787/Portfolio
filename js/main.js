var navigationBurger = document.querySelector('.navigation__burger');
var navigationList = document.querySelector('.navigation__list');
navigationBurger.addEventListener('click', openNavigationList);

function openNavigationList(e) {
  e.preventDefault();
  navigationList.classList.toggle('navigation__list--animatedIn');
  setTimeout(() => {
    navigationList.classList.toggle('navigation__list--show');
  }, 100);
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      openNavigationList(e);
    }
  });
}
