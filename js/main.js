window.addEventListener("DOMContentLoaded", function() {
  var isStorageSupport = true;
  var loginStorage = "";
  var emailStorage = "";

  try {
    loginStorage = localStorage.getItem("login");
    emailStorage = localStorage.getItem("email");
  } catch (error) {
    isStorageSupport = false;
  }

  var navigationBurger = document.querySelector('.navigation__burger');
  var navigationList = document.querySelector('.navigation__list');
  navigationBurger.addEventListener('click', openNavigationList);

  var form = document.querySelector(".contact__form");
  var formLogin = form.querySelector("#name");
  var formEmail = form.querySelector("#email");
  var formInputs = form.querySelectorAll("input");
  var button = form.querySelector(".form__button");
  var status = document.querySelector(".form__status");
  formLogin.value = loginStorage;
  formEmail.value = emailStorage;

  function success() {
    form.reset();
    formLogin.value = loginStorage;
    formEmail.value = emailStorage;
    status.innerHTML = "Спасибо!";

  }

  function error() {
    status.innerHTML = "Ууупс! Что-то пошло не так.";
  }

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].setAttribute("required", true);
      if(!formInputs[i].validity.valid) {
        ev.preventDefault();
      } else if(isStorageSupport) {
        localStorage.setItem("name", formLogin.value);
        localStorage.setItem("email", formEmail.value);
      }
    }

    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
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
