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

var LastScroll      = 0;
window.addEventListener("scroll", function(){
  var Statement = window.pageYOffset || document.documentElement.scrollTop;
  if(Statement > 100){
    if (Statement > LastScroll){
      document.getElementById('main-header').classList.add('header--pinned');
    } else {
      document.getElementById('main-header').classList.remove('header--pinned');
    }
  }
  LastScroll = Statement;
}, false);
