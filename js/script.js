"use strict";

// Header fade on scroll down
const header = document.querySelector('.header');
let viewportHeight;
let num;
let heightBreakPoints = [];

function getViewportHeight() {
  viewportHeight = window.innerHeight;
}
getViewportHeight();
window.addEventListener('resize', getViewportHeight);

num = viewportHeight / 15; // increase the number after division sing if you want the header to fade sooner
for (let i=1; i<=10 ;i++) {
  heightBreakPoints.push(num*i);
}

function fadeHeader() {
  let yOffset = window.pageYOffset;

  if (yOffset > heightBreakPoints[0] && yOffset <heightBreakPoints[1]) {
    header.style.opacity = .8;
  } else if (yOffset >= heightBreakPoints[1] && yOffset < heightBreakPoints[2]) {
    header.style.opacity = .7;
  } else if (yOffset >= heightBreakPoints[2] && yOffset < heightBreakPoints[3]) {
    header.style.opacity = .6;
  }  else if (yOffset >= heightBreakPoints[3] && yOffset < heightBreakPoints[4]) {
    header.style.opacity = .3;
  }  else if (yOffset >= heightBreakPoints[4] && yOffset < heightBreakPoints[5]) {
    header.style.opacity = .2;
  }  else if (yOffset >= heightBreakPoints[5] && yOffset < heightBreakPoints[6]) {
    header.style.opacity = .1;
  } else if (yOffset >= heightBreakPoints[6]) {
    header.style.opacity = 0;
  } else {
    header.style.opacity = 1;
  }
}

window.addEventListener('scroll', fadeHeader);

/*
function fadeHeader() {
  let yOffset = window.pageYOffset;

  if (yOffset > 50 && yOffset < 100) {
    header.style.opacity = .8;
  } else if (yOffset >= 100 && yOffset < 150) {
    header.style.opacity = .7;
  } else if (yOffset >= 150 && yOffset < 200) {
    header.style.opacity = .6;
  }  else if (yOffset >= 200 && yOffset < 250) {
    header.style.opacity = .5;
  }  else if (yOffset >= 250 && yOffset < 300) {
    header.style.opacity = .4;
  }  else if (yOffset >= 300 && yOffset < 350) {
    header.style.opacity = .3;
  }  else if (yOffset >= 350 && yOffset < 400) {
    header.style.opacity = .2;
  }  else if (yOffset >= 400 && yOffset < 450) {
    header.style.opacity = .1;
  }  else if (yOffset >= 450) {
    header.style.opacity = 0;
  } else {
    header.style.opacity = 1;
  }
}
*/


// scroll dwon button
const scrollDown = document.querySelector('.header__scroll-down');

function hideScrollDownBtn() {
  if ((document.body.scrollTop > 50) || (document.documentElement.scrollTop > 50)) {
    scrollDown.style.display = 'none';
  } else {
    scrollDown.style.display = 'block';
  }
}
window.onscroll = hideScrollDownBtn;

scrollDown.addEventListener('click', () => {
  document.querySelector('.navigation').scrollIntoView();
})

