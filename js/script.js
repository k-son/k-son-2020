"use strict";

// Header fade on scroll down
const header = document.querySelector('.header');
const headerCaption = document.querySelector('.header__caption__h1');
const headerCaptionShadow = document.querySelector('.header__caption__shadow');
let viewportHeight;
let num;
let heightBreakPoints = [];

function getViewportHeight() {
  viewportHeight = window.innerHeight;
}
getViewportHeight();
window.addEventListener('resize', getViewportHeight);

num = viewportHeight / 100; // increase the number after division sing if you want the header to fade sooner
for (let i=1; i<=100 ;i++) {
  heightBreakPoints.push(num*i);
}

function fadeHeader() {
  let yOffset = window.pageYOffset;

  if (yOffset > heightBreakPoints[0] && yOffset <heightBreakPoints[1]) {
    header.style.opacity = .8;
    header.style.height = "90vh";
  } else if (yOffset >= heightBreakPoints[1] && yOffset < heightBreakPoints[2]) {
    header.style.opacity = .7;
    header.style.height = "85vh";
  } else if (yOffset >= heightBreakPoints[2] && yOffset < heightBreakPoints[3]) {
    header.style.opacity = .6;
    header.style.height = "80vh";
  }  else if (yOffset >= heightBreakPoints[3] && yOffset < heightBreakPoints[4]) {
    header.style.opacity = .3;
    header.style.height = "75vh";
  }  else if (yOffset >= heightBreakPoints[4] && yOffset < heightBreakPoints[5]) {
    header.style.opacity = .2;
    header.style.height = "70vh";
  }  else if (yOffset >= heightBreakPoints[5] && yOffset < heightBreakPoints[6]) {
    header.style.opacity = .1;
    header.style.height = "65vh";
  } else if (yOffset >= heightBreakPoints[6]) {
    header.style.opacity = 0;
    header.style.height = "60vh";
  } else {
    header.style.opacity = 1;
    header.style.height = "100vh";
  }
}

window.addEventListener('scroll', fadeHeader);

// scroll dwon button
const scrollDown = document.querySelector('.header__scroll-down');

function hideScrollDownBtn() {
  if ((document.body.scrollTop > 30) || (document.documentElement.scrollTop > 50)) {
    scrollDown.style.display = 'none';
  } else {
    scrollDown.style.display = 'block';
  }
}
window.onscroll = hideScrollDownBtn;

scrollDown.addEventListener('click', () => {
  document.querySelector('.navigation').scrollIntoView();
})
