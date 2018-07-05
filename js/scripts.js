// smooth scrolling
$('a[href*=#]:not([href=#])').click(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 400);
            return false;
        }
    }
});  

// show bottom alert afer XXX seconds
setTimeout(function(){$('.signup-alert').addClass('active');}, 10000);

// hide bottom alert
$('.close-alert').click(function(){
    $('.signup-alert').removeClass('active');
    return false;
});

//open external links automatically in new tab
$('a').each(function() {
   var a = new RegExp('/' + window.location.host + '/');
   if(!a.test(this.href)) {
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
   }
});

// toggle mobile menu
$('.icon-menu').click(function(){
    $('nav.mobile-menu').toggleClass('open-menu');
    return false;
});

// close mobile menu
$('.close').click(function(){
    $('nav.mobile-menu').toggleClass('open-menu');
    return false;
});

// slide in quick bar on scroll
$(window).scroll(function() {
if ($(this).scrollTop() > 150){  
    $('.quick-bar').addClass("show-bar");
  }
  else{
    $('.quick-bar').removeClass("show-bar");
  }
});

// add the progress meter on the quick bar once visible
jQuery(function($){
  var growmouseover = [true, '25px'] // magnify progress bar onmouseover? [Boolean, newheight]

  var $indicatorparts = $('.quick-bar').append('<div class="scrollindicator"><div class="scrollprogress"></div></div>')
  var $indicatorMain = $indicatorparts.find('div.scrollindicator')
  var $scrollProgress = $indicatorparts.find('div.scrollprogress')
  var indicatorHeight = $indicatorMain.outerHeight()
  var transformsupport = $scrollProgress.css('transform')
  transformsupport = (transformsupport == "none" || transformsupport =="")? false: true

  function syncscrollprogress(){
      var winheight = $(window).height()
      var docheight = $(document).height()
      var scrollTop = $(window).scrollTop()
      var trackLength = docheight - winheight
      var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
      $scrollProgress.css('transform', 'translate3d(' + (-100 + pctScrolled) + '%,0,0)')
  }
  
  if (transformsupport){
    $indicatorMain.css('visibility', 'visible')
  
    $indicatorMain.on('click', function(e){
      var trackLength = $(document).height() - $(window).height()
      var scrollamt = e.clientX/($(window).width()-32) * trackLength
      $('html,body').animate({scrollTop: scrollamt}, 'fast')
    })
  
    if (growmouseover[0]){
      $indicatorMain.on('mouseenter touchstart', function(e){
        $(this).css('height', growmouseover[1])
        e.stopPropagation()
      })
    
      $indicatorMain.on('mouseleave', function(e){
        $(this).css('height', indicatorHeight)
      })
      
      $(document).on('touchstart', function(e){
        $indicatorMain.css('height', indicatorHeight)
      })
    }
    
    $(window).on("scroll load", function(){
      requestAnimationFrame(syncscrollprogress)
    })
  }
})
