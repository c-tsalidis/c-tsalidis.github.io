// on appear animation
var onAppearProjects = [];
var onAppearMain = [];

// ref --> https://codepen.io/zvona/pen/RwyyNK

document.addEventListener("DOMContentLoaded", function() {
    onAppearProjects = [].map.call(document.querySelectorAll(".onAppear"), function(item ) {
        return item;
    });

    onAppearMain = [].map.call(document.querySelectorAll(".onAppearMain"), function(item ) {
        return item;
    });
}, false);

window.addEventListener("scroll", function() {
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