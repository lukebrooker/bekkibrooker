// function loadModalImage($link, $container) {
//   var $img = $('<img class="Modal-image" />'),
//       imageSrcLarge = $link.attr('href');

//   $img.attr('src', imageSrcLarge)
//     .load(function() {
//       $container.append($img);
//       setTimeout(function() {
//         // $selectedItem.find('.Gallery-image').removeClass('is-loading');
//       }, 0);
//     });
// }

// function calcPercentOffset(size, windowSize) {
//   return ((100 - ((size / windowSize) * 100)) / 2) + '%';
// }

// function calcOffset(size, windowSize) {
//   return (windowSize - size) / 2;
// }

// function activateModal($link, e) {
//   var $container = $link.parents('.js-Gallery-itemContainer'),
//       $itemImg = $link.find('.js-Modal-item'),
//       $linkPrev = $link,
//       $linkNext = $link,
//       $modal = $('<div class="Modal js-Modal" />'),
//       $modalClose = $('<button class="Modal-close js-Modal-close">' +
//                         '<span class="u-hiddenVisually">Close</span>' +
//                       '</button>'),
//       $modalContainer =
//         $('<div class="Modal-itemContainer js-Modal-itemContainer" />'),
//       $modalPrev =
//         $('<div class="Modal-itemPrev js-Modal-itemPrev" />'),
//       $modalNext =
//         $('<div class="Modal-itemNext js-Modal-itemNext" />'),
//       itemOffset = $itemImg.offset(),
//       $body = $('body'),
//       _window = {},
//       modalConfig = {};

//   $modalClose.bind('click', disableModal);
//   $modal.append($modalClose);
//   modalConfig.portrait = false;
//   _window.width = $(window).width();
//   _window.height = $(window).height();
//   e.preventDefault();
//   modalConfig.positionX = '5%';

//   if (_window.width > _window.height) {
//     modalConfig.size = _window.height * .9;
//     modalConfig.positionY = calcOffset(modalConfig.size,_window.width);
//   }
//   else {
//     modalConfig.size = _window.width * .9;
//     modalConfig.portrait = true;
//     modalConfig.positionY = calcOffset(modalConfig.size,_window.height);
//   }

//   $body.addClass('Modal-is-active').append($modal);

//   loadModalImage($link, $modalContainer);
//   loadModalImage($link, $modalPrev);
//   loadModalImage($link, $modalNext);

//   setTimeout(function() {
//     $('.js-Modal').addClass('is-active');;
//   }, 0);

//   $(document).on('keyup', (function(e) {
//     switch (e.keyCode) {
//       // Esc
//       case 27:
//         disableModal();
//         break;
//       // Left
//       case 37:

//         break;
//       // Right
//       case 39:

//         break;
//     }
//   }));

//   $body.append($modalPrev);
//   $body.append($modalContainer);
//   $body.append($modalNext);

//   console.log(modalConfig.positionX, modalConfig.positionY);
// }

// function disableModal() {
//   $('.js-Modal-itemContainer').remove();
//   $('.js-Modal-itemPrev').remove();
//   $('.js-Modal-itemNext').remove();
//   $('body').removeClass('Modal-is-active');
//   $(document).unbind('keyup');
//   $('.js-Modal').removeClass('is-active');
//   setTimeout(function() {
//     $('.js-Modal').remove();
//   }, 250);
// }

// function nextModalImage() {
//   $('.js-Gallery-modalItems').addClass('is-next');
//   $('.js-Gallery-modalNext').addClass('is-active');
//   setTimeout(function() {
//     $('.js-Gallery-modalNext')
//       .addClass('js-Gallery-modalCurrent')
//       .removeClass('is-active js-Gallery-modalNext');
//     $('.js-Gallery-modalCurrent')
//       .addClass('js-Gallery-modalNext')
//       .removeClass('js-Gallery-modalCurrent');
//     $('.js-Gallery-modalPrev').remove();
//     $('.js-Gallery-modalItems').removeClass('is-next');
//   }, 500);
// }

// function prevModalImage() {
//   $('.js-Gallery-modalItems').addClass('is-previous');
//   $('.js-Gallery-modalPrev').addClass('is-active');
// }

// function closeModal() {
//   $('.js-Gallery-modal').removeClass('is-active');
//   $('.js-Gallery-modalContainer').removeClass('is-active');
// }

// $('.js-GalleryModal-link').on('click', function(e) {
//   activateModal($(this), e);
// });

// $('.js-Gallery-modalClose').on('click', closeModal);
// $('.js-Gallery-modalPrev').on('click', prevModalImage);
// $('.js-Gallery-modalNext').on('click', nextModalImage);
