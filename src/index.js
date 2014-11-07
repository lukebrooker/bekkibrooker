'use strict';

$(function() {
  $('.js-Gallery-list').gallery();
  $('textarea').autosize();
  $('.js-Swipebox').swipebox();
  $('#header').headroom({
    // vertical offset in px before element is first unpinned
    offset : 52,
    // scroll tolerance in px before state changes
    // tolerance : 0,
    // or scroll tolerance per direction
    // tolerance : {
    //   down : 0,
    //   up : 0
    // },
    // css classes to apply
    classes : {
      // when element is initialised
      initial : '',
      // when scrolling up
      pinned : 'is-available',
      // when scrolling down
      unpinned : 'is-unavailable',
      // when above offset
      top : 'is-top',
      // when below offset
      notTop : 'is-notTop'
    },
    // callback when pinned, `this` is headroom object
    // onPin : function() {},
    // callback when unpinned, `this` is headroom object
    // onUnpin : function() {},
    // callback when above offset, `this` is headroom object
    // onTop : function() {},
    // callback when below offset, `this` is headroom object
    // onNotTop : function() {}
  });
});
