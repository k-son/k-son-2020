"use strict";

const header = document.querySelector('.header');
const headerCaption = document.querySelector('.header__caption__h1');
const headerCaptionShadow = document.querySelector('.header__caption__shadow');
let viewportHeight;
let num;
let heightBreakPoints = [];
const scrollDown = document.querySelector('.header__scroll-down');

/*
const styles = getComputedStyle(document.documentElement);
const colorMain = styles.getPropertyValue('--color-main');
const colorSecondary = styles.getPropertyValue('--color-secondary');
const colorBgMain = styles.getPropertyValue('--color-bg-main');
*/

const cvBtnCv = document.querySelector('.cv__btn--cv');
const cvBtnCvSpan = document.querySelector('.cv__btn--cv span');
const cvButtonsLangBox = document.querySelector('.cv__buttonsLang-box');

const skillsBtns = document.querySelectorAll('.skills__btn');
const skillIcons = document.querySelectorAll('.skills__icon');
const descriptionBox = document.querySelector('.skills__descriptions-box');
const descriptions = document.querySelectorAll('.skills__description');
const iconMarks = document.querySelectorAll('.skills__btn__mark');

const anchorHeader = document.querySelector('.header');
const anchorAbout = document.querySelector('.about');
const anchorProjects = document.querySelector('.projects');
const anchorContact = document.querySelector('.contact');
const naviHeader = document.querySelector('.navigation__part__link__h1');
const naviAbout = document.getElementById('navi-about');
const naviProjects = document.getElementById('navi-projects');
const naviContact = document.getElementById('navi-contact');

const projectContainers = document.querySelectorAll('.project__container');


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


// scroll down button
function hideScrollDownBtn() {
  (document.body.scrollTop > 30) || (document.documentElement.scrollTop > 30)? scrollDown.style.display = 'none' : scrollDown.style.display = 'block';
}

window.addEventListener('scroll', hideScrollDownBtn);

scrollDown.addEventListener('click', () => {
  let amount  = viewportHeight * .69;
  window.scrollBy(0, amount);
})


/// cv
cvBtnCv.addEventListener('click', () => {
  cvBtnCvSpan.style.width = "100%";
  cvBtnCv.classList.add('cvMoveRight');
  window.setTimeout(function() {cvBtnCv.style.display = "none";}, 400);
  cvButtonsLangBox.style.display = "flex";
  cvButtonsLangBox.classList.add('cvMoveLeft');
})

cvBtnCv.addEventListener('mousemove', (e) => {
  const shape = cvBtnCv.getBoundingClientRect();
  const x = e.clientX - shape.left + "px";
  const y = e.clientY - shape.top + "px";
  cvBtnCvSpan.style.left = x;
  cvBtnCvSpan.style.top = y;
});


/// tech skills buttons

function showFirstSkill() {
  skillIcons[0].classList.add('colorSecondary');
  descriptionBox.style.display = "block";
  descriptions[0].style.display = "block";
}
showFirstSkill();

for (let skill = 0; skill<skillsBtns.length; skill++) {
  skillsBtns[skill].addEventListener('click', () => {
    skillIcons.forEach(e => e.classList.remove('colorSecondary'));
    descriptions.forEach(e => e.style.display = "none");
    skillIcons[skill].classList.add('colorSecondary');
    descriptionBox.style.display = "block";
    descriptions[skill].style.display = "block";
  });
}


 /// navi scroll indication
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

function indicateInNavigation() {
  if (isElementInViewport(anchorHeader)) {
    naviHeader.classList.add('colorMain');
    naviAbout.classList.remove('colorMain');
    naviProjects.classList.remove('colorMain');
    naviContact.classList.remove('colorMain');
  } else if (isElementInViewport(anchorAbout)) {
    naviHeader.classList.remove('colorMain');
    naviAbout.classList.add('colorMain');
    naviProjects.classList.remove('colorMain');
    naviContact.classList.remove('colorMain');
  } else if (isElementInViewport(anchorContact)) {
    naviHeader.classList.remove('colorMain');
    naviAbout.classList.remove('colorMain');
    naviProjects.classList.remove('colorMain');
    naviContact.classList.add('colorMain');
  } else {
    naviHeader.classList.remove('colorMain');
    naviAbout.classList.remove('colorMain');
    naviProjects.classList.add('colorMain');
    naviContact.classList.remove('colorMain');
  }
}

window.addEventListener('scroll', indicateInNavigation);


/// show project containers
function showProjects() {
  projectContainers.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('opacity-1');
    }
  })
}

window.addEventListener('scroll', showProjects);



/*
/// navi scroll indication 
let rectBody;
let rectAbout;
let rectProjects;
let rectContact;
let offsetAbout;
let offsetProjects;
let offsetContact;

const vh800 = window.matchMedia('(max-height: 800px)');
function contact() {
  if (vh800.matches) {
    offsetContact = rectContact.top - rectBody.top - viewportHeight;
  } else {
    offsetContact = rectContact.top - rectBody.top - viewportHeight*1.2;
  }
}

function calculateOffset() {
  rectBody = document.body.getBoundingClientRect();
  rectAbout = anchorAbout.getBoundingClientRect();
  rectProjects = anchorProjects.getBoundingClientRect();
  rectContact = anchorContact.getBoundingClientRect();
  //rectContactParagraph = contactParagraph.getBoundingClientRect();
  offsetAbout = rectAbout.top - rectBody.top;
  offsetProjects = rectProjects.top - rectBody.top - viewportHeight*0.5; // last number is to indicate projects in navi sooner
  contact();
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

window.addEventListener('scroll', navScrollIndication);
*/