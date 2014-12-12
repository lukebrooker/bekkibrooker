(function ($) {
  'use strict';
  var defaults = {
    flickr: {
      url: 'https://api.flickr.com/services/rest/?jsoncallback=?',
      apiKey: '7820ba2455d17f4a69f94bc3f2028484',
      photosetId: '72157646572847089'
    }
  };

  $.fn.gallery = function (options) {

    if (!this.length) {
      return this;
    }

    options = $.extend({}, defaults, options || {});

    return this.each(function () {

      var gallery = this,
          $gallery = $(gallery);

      function appendImage($selectedItem, $img, imageSrc) {
        $img.attr('src', imageSrc)
          .load(function() {
            $selectedItem.append($img);
            setTimeout(function() {
              $selectedItem.find('.Gallery-image').removeClass('is-loading');
            }, 0);
          });
      }

      $('.js-Gallery-cell').addClass('is-loaded');

      $.getJSON( options.flickr.url, {
        method: 'flickr.photosets.getPhotos',
        api_key: options.flickr.apiKey,
        media: 'photos',
        photoset_id: options.flickr.photosetId,
        extras: 'url_n, url_z',
        format: 'json'
      })
      .success(function(data) {
        var photoCount = data.photoset.photo.length
        for (var i = 0; i < photoCount; i++) {
          var $selectedItem = $('.js-Gallery-item').eq(i),
              photo = data.photoset.photo[i],
              imageSrc = photo.url_n,
              modalImage = photo.url_z,
              $img = $('<img />')
                .addClass('Gallery-image js-Gallery-image js-Modal-item is-loading'),
              $newGalleryCell;

          // In Case non-square images are uploaded
          if (photo.height_m < photo.width_m) {
            $img.addClass('Gallery-image--landscape');
          }
          else {
            $img.addClass('Gallery-image--portrait');
          }

          if (!$selectedItem.length) {
            $newGalleryCell = $('.js-Gallery-cell').eq(0).clone();
            $gallery.append($newGalleryCell);
            $selectedItem = $('.js-Gallery-item').last();
          }

          $selectedItem
            .attr('href', modalImage)
            .addClass('js-GalleryModal-link');

          appendImage($selectedItem, $img, imageSrc);

        }
      }).fail(function(data) {
        console.log(data, 'Unable to retrieve photo set information');
      });

    });

  };

}(jQuery || $));
