$(function () {
  var imgs = [];
  var index = 0;
  var timeout = null;
  var small = false;
  
  function next(inc) {
    var img = imgs[index = (index + inc) % imgs.length];
    $('.reel').animate({left: -img.offset}, 500, function () {
      img.caption.offset({left: img.caption.parent().offset().left + 40});
      $('.caption').css('opacity', '0');
      img.caption.css('opacity', '1');
    });
  };
  
  $(window).resize(function () {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(resize, 200);
  });
  
  function resize() {
    var height = $('#showcase').height();
    var width = $('#showcase').width();
    var reelwidth = 0;
    imgs = [];
    small = $(this).width() <= 1200;

    $('#showcase .img img').each(function () {
      var w = $(this).height(height).width() + 10;
      imgs.push({offset: reelwidth - (width - w) / 2, caption: $('.caption', $(this).parent())});
      reelwidth += w;
    });

    $('.reel').width(reelwidth);
    next(0);
  }
  
  resize();
  
  $('.left-arrow').click(next.bind(null, -1));
  $('.right-arrow').click(next.bind(null, 1));
  
  $('nav a').click(function () {
    if (!small) {
      var link = this.href.match(/#(.*)$/) || [];
      
      if (link[1]) {
        if (link[1] === 'showcase') {
          $('html,body').animate({scrollLeft: 0});
        } else {
          $('html,body').animate({scrollLeft: $('nav').offset().left});
          
          var page = $('.' + link[1] + '-page');
          var top = page.offset().top;
          
          if (top)
            $('#copy').animate({scrollTop: top});
          
          page.animate({scrollTop: 0});
        }
      }
      
      return false;
    }
  });
});