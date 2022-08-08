// on appear animation
var onAppearProjects = [];
var onAppearMain = [];
var fixedHeroText;

// ref --> https://codepen.io/zvona/pen/RwyyNK

document.addEventListener("DOMContentLoaded", function() {
    // fixedHeroText = document.getElementsByClassName("hero-sticky")[0];
    // fixedHeroText.style.display = "none";

    onAppearProjects = [].map.call(document.querySelectorAll(".onAppear"), function(item ) {
        return item;
    });

    onAppearMain = [].map.call(document.querySelectorAll(".onAppearMain"), function(item ) {
        return item;
    });
}, false);

window.addEventListener("scroll", function() {
    // scrollFunction();
    checkScroll(onAppearProjects, "visible-projects");
    checkScroll(onAppearMain, "visible-main");
}, false);

function checkScroll(e, v) {
    e.forEach(function(elem) {
        if(calculateScrollToAppear(elem)) {
            elem.classList.add(v);
        } else {
            elem.classList.remove(v);
        }
    });
}

function calculateScrollToAppear(elem) {
    var vwTop = window.pageYOffset;
    var vwBottom = (window.pageYOffset + window.innerHeight);
    var elemTop = elem.offsetTop;
    var elemHeight = elem.offsetHeight;

    if (vwBottom > elemTop && ((vwTop - elemHeight) < elemTop)) { 
        return true;
    }
    else {
        return false;
    }
}

// When the user scrolls down 20px from the top of the document, slide down the navbar
function scrollFunction() {
  if (document.body.scrollTop > (window.innerHeight - 20)) { // || document.documentElement.scrollTop > 20) {
      fixedHeroText.style.display = "block";
      // fixedHeroText.classList.remove("hero-sticky");
      // document.getElementsByClassName("hero-text").style.top = "0";
      // document.getElementById("hero-text").style.top = "50%";
    } else {
    fixedHeroText.style.display = "none";
      // fixedHeroText.classList.add("hero-sticky");
    // document.getElementById("hero-text").style.top = "50%";
    // document.getElementsByClassName("hero-text").style.top = "-50px";
  }
}