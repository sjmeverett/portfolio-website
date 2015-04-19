$(function () {
  var imgs = [];
  var index = 0;
  var timeout = null;
  
  function next(inc) {
    var img = imgs[index = (index + inc) % imgs.length];
    $('.reel').css('left', -img.offset);
    $('.caption').css('opacity', '0');
    img.caption.css('opacity', '1');
  };
  
  $(window).resize(function () {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(resize, 200);
  });
  
  function resize() {
    var height = $(this).height();
    var width = $(this).width() * 0.8;
    var reelwidth = 0;
    imgs = [];

    $('#showcase .img img').each(function () {
      var w = $(this).height(height).width() + 10;
      imgs.push({offset: reelwidth - (width - w) / 2, caption: $('.caption', $(this).parent())});
      reelwidth += w;
    });

    $('.reel').width(reelwidth);
    next(0);
  }
  
  resize();
  window.next = next;
});