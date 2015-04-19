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
  
  $('a[href="#showcase"]').click(function () {
    if (!small) {
      $('html,body').animate({scrollLeft: 0});
      return false;
    }
  });
  
  $('a[href="#biography"]').click(function () {
    if (!small) {
      $('html,body').animate({scrollLeft: $('nav').offset().left});
      $('#copy').animate({scrollTop: $('.biography-page').offset().top});
      return false;
    }
  });
  
  $('a[href="#contact"]').click(function () {
    if (!small) {
      $('html,body').animate({scrollLeft: $('nav').offset().left});
      $('#copy').animate({scrollTop: $('.contact-page').offset().top});
      return false;
    }
  });
});