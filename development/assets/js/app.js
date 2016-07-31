/**
 *
 * Pace Loading Bar
 *
 */

paceOptions = {
    elements: true
};


/**
 *
 * Header Pinned
 *
 */

var LastScroll = 0;

window.addEventListener("scroll", function(){
  var Statement = window.pageYOffset || document.documentElement.scrollTop;
  console.log(Statement);
  if (Statement > LastScroll){
    document.getElementById('main-header').classList.remove('header-pinned--hide');
  } else {
    document.getElementById('main-header').classList.add('header-pinned--hide');
  }
  LastScroll = Statement;
}, false);
