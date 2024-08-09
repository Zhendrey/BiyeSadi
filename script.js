import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.cards__wrapper', {
 // Optional parameters
  direction: 'horizontal',
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 'auto',
  keyboard: true,
});

//!SWIPER HTML STRUCTURE

const page = document.querySelector(".page");
const sections = page.children;

const coordinates = [...sections].map(section =>{
  return (section.getBoundingClientRect().top + window.pageYOffset);
})

const sectionsBottom = [...sections].map(section =>{
  return (section.getBoundingClientRect().bottom + window.pageYOffset);
})
coordinates.push(sectionsBottom[sectionsBottom.length - 1])

console.log(coordinates);

//! HEADER & MAIN PAGE

const fullscreen = document.querySelector(".fullscreen");
const fullscreenPosition = fullscreen.getBoundingClientRect().bottom;
const header = document.querySelector(".header");
const mainChildren = document.querySelector(".main__container:not(.main__image)").children;

window.addEventListener("scroll", (e)=>{
  if(window.scrollY < fullscreenPosition){
    header.classList.add("MAIN-transition-right");
    [...mainChildren].forEach(child =>{
      child.classList.add("MAIN-transition-top");
    })
  }else{
    [...mainChildren].forEach(child =>{
      child.classList.remove("MAIN-transition-top");
    })
  }
})

header.classList.add("MAIN-transition-right");
[...mainChildren].forEach(child =>{
  child.classList.add("MAIN-transition-top");
})


//! section.special

const special = document.querySelector(".special");
const specialPositionTop = special.getBoundingClientRect().top + window.pageYOffset;
const specialPositionBottom = special.getBoundingClientRect().bottom + window.pageYOffset;
const instructionsRow = document.querySelector(".instructions__row");

window.addEventListener("scroll", (e)=>{
  if(window.scrollY >= specialPositionTop / 2
    && window.scrollY <= specialPositionBottom){
    special.classList.add("SPECIAL-transition-top")
  }else{
    special.classList.remove("SPECIAL-transition-top")
  }
})


//!section.meet

const meet = document.querySelector(".meet")
const [...meetChildren] = meet.querySelector(".meet__container").children;

window.addEventListener("scroll", (e)=>{
  animationSection(1, meet, [...meetChildren], "active", ['MEET-right', 'MEET-top' ,'MEET-left'])
})

//!section.stories

const stories = sections[2];
const storiesChildren = stories.children[0].children;
console.log(stories);
console.log(storiesChildren);

window.addEventListener("scroll", (e)=>{
  animationSection(2, stories, [...storiesChildren], "active", ['MEET-right', 'MEET-top' ,'MEET-left'])
})

//!section.start-story
const startStory = sections[3];
const startStoryChildren = startStory.children[0].children[0].children;

window.addEventListener("scroll", (e)=>{
  animationSection(
    3, startStory, [...startStoryChildren], "active", ["right", "left"]
  )
})


//!section.search

const searchForm = document.querySelector(".search__form");

searchForm.addEventListener("click", function(event){
  const targetElem = event.target;
  if(targetElem.classList.contains("form__option")){
    targetElem.classList.toggle("checked")
  }
})

const search = sections[4];
const searchChildren = search.children[0].children;

window.addEventListener("scroll", (e)=>{
  animationSection(
    4, search, [...searchChildren], "active", ["right", "right", "right"]
  )
})

//!section.download

const download = sections[5];
const downloadChildren = download.children[0].children;

window.addEventListener("scroll", (e)=>{
  animationSection(
    5, download, [...downloadChildren], "active", ["top", "top"]
  )
})


//!section.speech

const speech = sections[6];
const speechChildren = speech.children[0].children;

window.addEventListener("scroll", (e)=>{
  animationSection(
    6, speech, [...speechChildren], "active", ["active", "active"]
  )
})


//!section.trusted

const trusted = sections[7];
const trustedChildren = trusted.children[0].children;
const [...trustedBadges] = document.querySelectorAll(".badges__badge");
console.log(trustedBadges);
window.addEventListener("scroll", (e)=>{
  animationSectionBadges(
    7, trusted, [...trustedChildren], "active", ["right", "active"]
    )
})


//!footer

const footerColumn = document.querySelectorAll(".footer__column");

const footerColumnHasNoTitle = [...footerColumn].filter((column)=>{
  return !column.firstElementChild.classList.contains("footer__title")
})

console.log(footerColumnHasNoTitle);

if(footerColumnHasNoTitle){
  footerColumnHasNoTitle.forEach(column =>{
    column.classList.add("align-end");
  })
}

const footer = document.querySelector("footer.footer");
const footerChildren = footer.children[0].children;

window.addEventListener("scroll", (e)=>{
  animationSectionFooter(
    footer, "active"
    )
  })


//! ESSENTIAL FUNCTIONS!

function animationSection(index, parent, children, parentClass, classes){
  if(window.scrollY >= coordinates[index - 1] 
    && window.scrollY <= coordinates[index + 1]){
      parent.classList.add(parentClass)
      children.forEach((child, i) =>{
        child.classList.add(classes[i])
      })
    }else{
      parent.classList.remove(parentClass)
      children.forEach((child, i) =>{
        child.classList.remove(classes[i])
      })
    }
}
function animationSectionBadges(index, parent, children, parentClass, classes){
  if(window.scrollY >= coordinates[index - 1] 
    && window.scrollY <= coordinates[index + 1]){
      parent.classList.add(parentClass)
      children.forEach((child, i) =>{
        child.classList.add(classes[i])
      })
      trustedBadges.forEach((badge, i = 1) =>{
        setTimeout(() => {
          badge.classList.add("right")
        }, 300 * i);
      })
    }else{
      parent.classList.remove(parentClass)
      children.forEach((child, i) =>{
        child.classList.remove(classes[i])
      })
      trustedBadges.forEach((badge, i = 1) =>{
        setTimeout(() => {
          badge.classList.remove("right")
        }, 300 * i);
      })
    }
}
function animationSectionFooter(parent, parentClass){
  const footerTop = parent.getBoundingClientRect().top + window.pageYOffset;
  if(window.scrollY >= footerTop - (coordinates[coordinates.length - 1] / 10)){
      parent.classList.add(parentClass)
    }else{
      parent.classList.remove(parentClass)
    }
}