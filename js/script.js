(function() {
  "use strict";

  const header = document.querySelector('.header');
  const headerCaption = document.querySelector('.header__caption__h1');
  const headerCaptionShadow = document.querySelector('.header__caption__shadow');
  let viewportHeight;
  let num;
  let heightBreakPoints = [];
  const scrollDown = document.querySelector('.header__scroll-down');
  
  const cvBtnCv = document.querySelector('.cv__btn--cv');
  const cvBtnCvSpan = document.querySelector('.cv__btn--cv span');
  const cvButtonsLangBox = document.querySelector('.cv__buttonsLang-box');
  
  const skillsBtns = document.querySelectorAll('.skills__btn');
  const skillIcons = document.querySelectorAll('.skills__icon');
  const descriptionBox = document.querySelector('.skills__descriptions-box');
  const descriptions = Array.from(document.querySelectorAll('.skills__description'));
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
  
  
  //// Helper functions
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
  
  function debounced(delay, fn) {
    let timerId;
  
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
  }
  
  
  //// Header fade on scroll
  function getViewportHeight() {
    viewportHeight = window.innerHeight;
  }
  getViewportHeight();
  window.addEventListener('resize', getViewportHeight);
  
  num = viewportHeight / 30; // increase the number after division sign if you want the header to fade sooner
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
  
  
  //// Scroll down button
  function hideScrollDownBtn() {
    (document.body.scrollTop > 30) || (document.documentElement.scrollTop > 30)? scrollDown.style.display = 'none' : scrollDown.style.display = 'block';
  }
  
  window.addEventListener('scroll', hideScrollDownBtn);
  
  scrollDown.addEventListener('click', () => {
    let amount  = viewportHeight * .69;
    window.scrollBy(0, amount);
  })
  
  
  //// CV
  cvBtnCv.addEventListener('click', () => {
    cvBtnCvSpan.style.width = "100%";
    cvBtnCv.classList.add('opacity0');
    window.setTimeout(function() {
      cvBtnCv.style.display = "none";
      cvButtonsLangBox.style.display = "flex";
      cvButtonsLangBox.classList.add('cvMoveInFromLeft');
    }, 350);
  })
  
  cvBtnCv.addEventListener('mousemove', (e) => {
    const shape = cvBtnCv.getBoundingClientRect();
    const x = e.clientX - shape.left + "px";
    const y = e.clientY - shape.top + "px";
    cvBtnCvSpan.style.left = x;
    cvBtnCvSpan.style.top = y;
  })
  
  
  //// Tech skills buttons
  // Show first skill on page load
  function showFirstSkill() {
    skillIcons[0].classList.add('colorSecondary');
    descriptions[0].classList.add('displayBlock');
  }
  showFirstSkill();
  
  
  // Show skill description on button press
  skillsBtns.forEach(btn => btn.addEventListener("click", function() {
    const skill = this.getAttribute('data-skill');
    const icon = this.lastElementChild;
    const description = descriptions.find(el => el.dataset.skill === skill);
  
    skillIcons.forEach(ico => ico.classList.remove('colorSecondary'));
    descriptionBox.classList.add('opacity0');
    setTimeout(function() {
      descriptions.forEach(des => des.classList.remove('displayBlock'));
      }, 200)
    icon.classList.add('colorSecondary');
    setTimeout(function() {
      description.classList.add('displayBlock');
      descriptionBox.classList.remove('opacity0');
      }, 250)
    if (!isElementInViewport(descriptionBox)) {
      window.scrollBy(0, 350);
    }
  }))
  
  
  //// Navi scroll indication
  const indicateInNavigation = debounced(150, function() {
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
  })
  
  window.addEventListener('scroll', indicateInNavigation);
  
  
  //// Slide in projects
  const showProjects = debounced(200, function() {
    projectContainers.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('opacity-1');
      }
    })
  })
  
  window.addEventListener('scroll', showProjects);
})();