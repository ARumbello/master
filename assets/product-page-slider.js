//  Starter Theme by Sleepless Media
//
// Main Javascript entry file.
(function ($) {
  $(window).ready(function () {




    var ready = true;
    var buffer = '';
    
     $('.prodMain__upperSlider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.prodMain__lowerSlider'
    });
    $('.prodMain__lowerSlider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.prodMain__upperSlider',
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
      // responsive: [
      //   {
      //     breakpoint: 768,
      //     settings: {
      //       slidesToShow: 4,
      //       slidesToScroll: 4,
      //       dots: true
      //     }
      //   },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       dots: true
      //     }
      //   }
      // ]
    });
    var oldScroll = $(document).scrollTop();
    var newScroll = oldScroll;
    
  });
})(jQuery); // Starter Theme by Sleepless Media
//This file is intended to be used for small ongoing fixes or changes post-launch.
// Starter Theme by Sleepless Media
//This file is intended to be used for small ongoing fixes or changes post-launch.