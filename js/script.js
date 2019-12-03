"use strict";

const scrollDown = document.querySelector('.header__scroll-down');

function hideScrollDownBtn() {
  if ((document.body.scrollTop > 50) || (document.documentElement.scrollTop > 50)) {
    scrollDown.style.display = 'none';
  }
}
window.onscroll = hideScrollDownBtn;