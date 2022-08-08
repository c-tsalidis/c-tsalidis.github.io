// on appear animation
var onAppear = [];

// ref --> https://codepen.io/zvona/pen/RwyyNK

document.addEventListener("DOMContentLoaded", function() {
onAppear = [].map.call(document.querySelectorAll(".onAppear"), function(item ) {
    return item;
});
}, false);

window.addEventListener("scroll", function() {
onAppear.forEach(function(elem) {
    var vwTop = window.pageYOffset;
    var vwBottom = (window.pageYOffset + window.innerHeight);
    var elemTop = elem.offsetTop;
    var elemHeight = elem.offsetHeight;
    
    if (vwBottom > elemTop && ((vwTop - elemHeight) < elemTop)) {
    elem.classList.add("visible");
    } else {
    elem.classList.remove("visible");
    }
});
}, false);