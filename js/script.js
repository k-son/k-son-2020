
const scrollDown = document.querySelector('.header__scroll-down');

function hideScrollDownBtn() {
  scrollDown.style.display = 'none';
}
window.onscroll = hideScrollDownBtn;