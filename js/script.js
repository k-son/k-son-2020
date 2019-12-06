"use strict";

const header = document.querySelector('.header');
const headerCaption = document.querySelector('.header__caption__h1');
const headerCaptionShadow = document.querySelector('.header__caption__shadow');
let viewportHeight;
let num;
let heightBreakPoints = [];

const styles = getComputedStyle(document.documentElement);
const colorMain = styles.getPropertyValue('--color-main');
const colorSecondary = styles.getPropertyValue('--color-secondary');
const colorBgMain = styles.getPropertyValue('--color-bg-main');

const skillsBtns = document.querySelectorAll('.skills__btn');
const skillIcons = document.querySelectorAll('.skills__icon');
const descriptionBox = document.querySelector('.skills__descriptions-box');
const descriptions = document.querySelectorAll('.skills__description');
const iconMarks = document.querySelectorAll('.skills__btn__mark');

const anchorAbout = document.getElementById('about');
const anchorProjects = document.getElementById('projects');
const anchorContact = document.getElementById('contact');
const naviAbout = document.getElementById('navi-about');
const naviProjects = document.getElementById('navi-projects');
const naviContact = document.getElementById('navi-contact');


/// Header fade on scroll down

function getViewportHeight() {
  viewportHeight = window.innerHeight;
}
getViewportHeight();
window.addEventListener('resize', getViewportHeight);

num = viewportHeight / 30; // increase the number after division sing if you want the header to fade sooner
for (let i=1; i<=30 ;i++) {
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
  if ((document.body.scrollTop > 30) || (document.documentElement.scrollTop > 30)) {
    scrollDown.style.display = 'none';
  } else {
    scrollDown.style.display = 'block';
  }
}

window.addEventListener('scroll', hideScrollDownBtn);

scrollDown.addEventListener('click', () => {
  let amount  = viewportHeight * .69;
  window.scrollBy(0, amount);
})


/// tech skills buttons

function showFirstSkill() {
  skillIcons[0].style.color = colorSecondary;
  descriptionBox.style.display = "block";
  descriptions[0].style.display = "block";
}
showFirstSkill();

for (let skill = 0; skill<skillsBtns.length; skill++) {
  skillsBtns[skill].addEventListener('click', () => {
    skillIcons.forEach(e => {
      e.style.color = colorMain;
      e.style.fill = colorMain;
    })
    descriptions.forEach(e => e.style.display = "none");
    skillIcons[skill].style.color = colorSecondary;
    skillIcons[skill].style.fill = colorSecondary;
    descriptionBox.style.display = "block";
    descriptions[skill].style.display = "block";
  });
}


/// navi scroll indication
let rectBody;
let rectAbout;
let rectProjects;
let rectContact;
let offsetAbout;
let offsetProjects;
let offsetContact;

function calculateOffset() {
  rectBody = document.body.getBoundingClientRect();
  rectAbout = anchorAbout.getBoundingClientRect();
  rectProjects = anchorProjects.getBoundingClientRect();
  rectContact = anchorContact.getBoundingClientRect();
  offsetAbout = rectAbout.top - rectBody.top;
  offsetProjects = rectProjects.top - rectBody.top - 400; // last number is to indicate projects in navi sooner
  offsetContact = rectContact.top - rectBody.top - 600; // last number is to indicate contact in navi sooner
}
calculateOffset();
window.addEventListener('resize', calculateOffset);


function navScrollIndication() {
  if ((document.body.scrollTop >= offsetProjects) || (document.documentElement.scrollTop >= offsetProjects)) {
    if ((document.body.scrollTop >= offsetProjects && document.body.scrollTop < offsetContact) || (document.documentElement.scrollTop >= offsetProjects && document.documentElement.scrollTop < offsetContact)) {
      naviAbout.style.color = colorBgMain;
      naviProjects.style.color = colorMain;
      naviContact.style.color = colorBgMain;
    } else {
      naviAbout.style.color = colorBgMain;
      naviProjects.style.color = colorBgMain;
      naviContact.style.color = colorMain;
    }
  } else {
    naviAbout.style.color = colorMain;
    naviProjects.style.color = colorBgMain;
    naviContact.style.color = colorBgMain;
  }
}

/*
function navScrollIndication() {
  if ((document.body.scrollTop >= anchorProjects) || (document.documentElement.scrollTop >= anchorProjects)) {
    if ((document.body.scrollTop >= anchorProjects && document.body.scrollTop < anchorContact) || (document.documentElement.scrollTop >= anchorProjects && document.documentElement.scrollTop < anchorContact)) {
      naviAbout.style.color = colorBgMain;
      naviProjects.style.color = colorMain;
      naviContact.style.color = colorBgMain;
    } else {
      naviAbout.style.color = colorBgMain;
      naviProjects.style.color = colorBgMain;
      naviContact.style.color = colorMain;
    }
  } else {
    naviAbout.style.color = colorMain;
    naviProjects.style.color = colorBgMain;
    naviContact.style.color = colorBgMain;
  }
}
*/


window.addEventListener('scroll', navScrollIndication);


