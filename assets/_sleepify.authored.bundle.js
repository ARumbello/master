//  Starter Theme by Sleepless Media
//
// Main Javascript entry file.
(function ($) {
  $(window).ready(function () {

    $('.qtybox .btnqty').on('click', function(){
      var qty = parseInt($(this).parent('.qtybox').find('.prodMain__qty').val());
      if($(this).hasClass('qtyplus')) {
        qty++;
      }else {
        if(qty > 1) {
          qty--;
        }
      }
      qty = (isNaN(qty))?1:qty;
      $(this).parent('.qtybox').find('.prodMain__qty').val(qty);
   }); 
    
    //Knockout Code
    var ViewModel = function ViewModel() {
      self = this; //PDP Observables

      if (meta.pageType == 'product') {
        this.pdp_option1_selected = ko.observable("");
        this.pdp_option2_selected = ko.observable("");
        this.pdp_option3_selected = ko.observable("");
        this.pdp_color_selected = ko.observable("");
        this.pdp_quantity_selected = ko.observable(1);
        this.pdp_product_data = ko.observable({});
        this.pdp_thumbs_array = ko.observableArray([]);
        this.pdp_thumbs_visible = ko.observableArray([]);
        this.pdp_variants_meta = ko.observableArray(meta.product.variants || []);
        this.pdp_active_possibilities = ko.observableArray([]);
        this.pdp_active_option = ko.observable(1); //PDP Functions

        this.pdp_variant_selected_title = ko.computed(function () {
          return "".concat(this.pdp_option1_selected(), " / ").concat(this.pdp_option2_selected(), " / ").concat(this.pdp_option3_selected());
        }, this); //Reach out from each control input and make sure the
        //input's value is possible given the

        this.pdp_variant_selected_id = ko.computed(function () {
          var _this = this;

          var id = null;
          this.pdp_variants_meta().forEach(function (element) {
            if (element.public_title == _this.pdp_variant_selected_title()) {
              id = element.id;
            }
          });

          if (id) {
            return id;
          }
        }, this);

        this.match_with_images = function (color, option) {
          if (option == 1) {
            self.pdp_option1_selected(color);
          }

          if (option == 2) {
            self.pdp_option2_selected(color);
          }

          if (option == 3) {
            self.pdp_option3_selected(color);
          }

          var arr = self.pdp_thumbs_array();
          color = color.replace(' ', '-');
          self.pdp_thumbs_visible([]);
          arr.forEach(function (el, index) {
            if (el.toLowerCase().includes(color.toLowerCase())) {
              self.pdp_thumbs_visible.push(el);
            }
          });
        };

        this.pdp_selected_contains_me = function (data, option_number, value) {
          if (option_number != self.pdp_active_option()) {
            return self.pdp_active_possibilities().toString().includes(value);
          } else {
            return true;
          }
        };

        this.pdp_option1_value_possibilites = ko.computed(function () {
          var _this2 = this;

          var arr = [];
          this.pdp_variants_meta().forEach(function (variant) {
            if (variant.public_title.includes(_this2.pdp_option1_selected())) {
              arr.push(variant.public_title);
            }
          });
          this.pdp_active_option(1);
          this.pdp_active_possibilities(arr);
        }, this);
        this.pdp_option2_value_possibilites = ko.computed(function () {
          var _this3 = this;

          var arr = [];
          this.pdp_variants_meta().forEach(function (variant) {
            if (variant.public_title.includes(_this3.pdp_option2_selected())) {
              arr.push(variant.public_title);
            }
          });
          this.pdp_active_option(2);
          this.pdp_active_possibilities(arr);
        }, this);
        this.pdp_option3_value_possibilites = ko.computed(function () {
          var _this4 = this;

          var arr = [];
          this.pdp_variants_meta().forEach(function (variant) {
            if (variant.public_title.includes(_this4.pdp_option3_selected())) {
              arr.push(variant.public_title);
            }
          });
          this.pdp_active_option(3);
          this.pdp_active_possibilities(arr);
        }, this);

        this.pdp_increment = function () {
          self.pdp_quantity_selected(parseInt(self.pdp_quantity_selected() + 1));
        };

        this.pdp_decrement = function () {
          if (self.pdp_quantity_selected() > 1) {
            self.pdp_quantity_selected(parseInt(self.pdp_quantity_selected() - 1));
          }
        };
      }
      
      //Cart Observables

      var cartItems = CartJS.cart.items;
      if(cartItems?.length) {
        for (i=0;i<cartItems.length;i++){
          if (cartItems[i].handle == 'neuromd-ondemand'){
            CartJS.updateItem((i+1), 1);
          }
        }
      }

      this.articles = ko.observableArray([]);
      this.item_count = ko.observable(CartJS.cart.item_count);
      this.total_price = ko.observable(CartJS.cart.total_price);
      this.items = ko.observableArray(CartJS.cart.items);
      this.variant_id = ko.observable(0); //Cart Functions

      this.hiddenVariant = function(text){
        /*if (text == 'Free 30 Day Trial - Renews at $96/yr'){
          return '';
        }
        else{
        */
          return text;
        //}
      };
      
      this.toDollars = function (num) {
        return "$" + (parseInt(num) / 100).toFixed(2);
      };
      
      this.orderStyle = function (num) {
        return "order:" + num + ";";
      };
      
      this.chechIfDiscounted = function(line_price, price){
        if (line_price === price){
          return "display:none;";
        }
        else{
          return "display:block;"
        }
      }
      
      this.hideCoach = function(title){
        if (title == 'OnDemand Platform + Certified Pain Coach'){
          return "opacity:0;height:0;overflow:hidden;padding:0;";
        }
        else{
          return "opacity:1;";
        }
      };

      this.clearCart = function () {
        CartJS.clear();
      };

      this.addItem = function (variantId, quantity) {
        CartJS.addItem(variantId, quantity, {}, {});
      };

      this.removeItem = function (variantId) {
        CartJS.removeItemById(variantId);
      };

      this.increment = function (line_number, quantity) {
        quantity = parseInt(quantity + 1);
        CartJS.updateItem(line_number + 1, quantity, {}, {
          "success": function success(data, textStatus, jqXHR) {
            if (data.items[line_number].quantity < quantity) {
              console.log('The requested quantity for this item is not available.');
            }
          },
          "error": function error(jqXHR, textStatus, errorThrown) {
            console.error('Error: ' + errorThrown + '!');
          }
        });
      };

      this.decrement = function (line_number, quantity) {
        if (quantity > 1) {
          quantity = parseInt(quantity - 1);
          CartJS.updateItem(line_number + 1, quantity, {}, {
            "success": function success(data, textStatus, jqXHR) {
              if (data.items[line_number].quantity < quantity) {
                console.log('The requested quantity for this item is not available.');
              }
            },
            "error": function error(jqXHR, textStatus, errorThrown) {
              console.error('Error: ' + errorThrown + '!');
            }
          });
        }
      };

      this.removeItem = function (line_number) {
        CartJS.updateItem(line_number + 1, 0, {}, {
          "success": function success(data, textStatus, jqXHR) {
            console.info('Item removed from cart.');
            window.location.reload();
          },
          "error": function error(jqXHR, textStatus, errorThrown) {
            console.error('Error: ' + errorThrown + '!');
          }
        });
      };

      this.enterQuantity = function (line_number, quantity, item, event) {
        var self = this;

        if (quantity >= 1) {
          CartJS.updateItem(line_number, quantity, {}, {
            "success": function success(data, textStatus, jqXHR) {},
            "error": function error(jqXHR, textStatus, errorThrown) {
              console.error('Error: ' + errorThrown + '!');
            }
          });
        }
      };

      this.sortArticlesBy = function (tag) {
        var result = self.articles().filter(function (element) {
          return element.tags.includes(tag) ? true : false;
        });
        self.articles(result);
      };
    };

    ko.bindingHandlers.enterkey = {
      //this is not just an enterkey binding. It is specifically for the qty control
      init: function init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
          var keyCode = event.which ? event.which : event.keyCode;

          if (keyCode === 13) {
            callback.call(bindingContext.$data, parseInt(bindingContext.$index() + 1), parseInt(element.value));
            return false;
          }

          return true;
        });
      }
    };
    ko.applyBindings(new ViewModel()); //Everytime a request to CartJS is finished, sync the view model with CartJS.

    $(document).on('cart.requestComplete', function (event, cart) {
      ko.dataFor(document.body).items(CartJS.cart.items);
      ko.dataFor(document.body).total_price(CartJS.cart.total_price);
      ko.dataFor(document.body).item_count(CartJS.cart.item_count);
    }); //End Knockout Code
    // Let the document know when the mouse is being used

    document.body.addEventListener("mousedown", function () {
      document.body.classList.add("using-mouse");
    });
    document.body.addEventListener("keydown", function () {
      document.body.classList.remove("using-mouse");
    }); // Let the document know when page is scrolled.

    $(window).on("scroll load", function (event) {
      if ($(document).scrollTop() > 30) {
        $("body").addClass("scrolled");
      } else {
        $("body").removeClass("scrolled");
      }
    });

    if ($('#compare').text().trim() == '$ 0.00') {
      $('#compare').hide();
    }

    $('#variantDrop').on('change', function () {
      var index = $(this).val();
      index = index * 1;
      var newObj = variants[index];
      $(this).parent().parent().find('#compare').text(newObj.compare_price);
      $(this).parent().parent().find('#price').text(newObj.price);

      if ($('#compare').text().trim() === '$ 0.00') {
        $('#compare').hide();
      } else {
        $('#compare').show();
      }
    });
    var ready = true;
    var buffer = '';
    $('.buyButton').on('click', function () {
      if($('.new-atc-bt').length > 0){
        $('.new-atc-bt').click();
        return;
      }
      var thisThing = $(this);
      var index = $('#variantDrop').val();
      index = index * 1;
      var newObj = variants[index];
      var qty = $('#quantity').val();
      
      var apply_fb_discount = 0;
      var discount_code = "";
      
      if($('#apply_fb_discount').length > 0 && $('#fb_discount_code').length> 0){
        apply_fb_discount = $('#apply_fb_discount').val();
        discount_code = $('#fb_discount_code').val().toString();
      }
      

      if (ready == true) {
        ready = false;
        buffer = thisThing.text();
        thisThing.text('Adding...');
        CartJS.addItem(newObj.id, qty, {}, {
          "success": function success(data, textStatus, jqXHR) {
            /*
            if ($('.mobileMenu').is(':visible')) {} else {
              if ($('.miniCart').is(':visible')) {
                $('.miniCart').slideUp();
                $('.mobileMenu__overlay').fadeOut();
              } else {
                $('.miniCart').slideDown();
                $('.mobileMenu__overlay').fadeIn();
              }
            }*/
            if(apply_fb_discount == 1 && discount_code != "" ) {
              window.location.href = "/cart?discount=" + discount_code;
            } else {
              window.location.href = "/cart";
            }
            
            setTimeout(function () {
              ready = true;
              thisThing.text(buffer);
            }, 500);
          },
          "error": function error(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + errorThrown + '!');
            setTimeout(function () {
              ready = true;
              thisThing.text(buffer);
            }, 500);
          }
        });
      }
    });

    if (document.querySelectorAll('a[href^="#"]')) {
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        if (anchor.getAttribute('href') != '#') {
          anchor.addEventListener('click', function (e) {
            e.preventDefault(); //try {

            document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
            }); //}

            /* catch{
               console.log("error");
             } */
          });
        }
      });
    } // added JS Below


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

    $('.prodStudies__slideShow').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      adaptiveHeight: true
    });
    $('.reviewSlideshow').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      adaptiveHeight: true
    });
    $('.mobile-review').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true,
      adaptiveHeight: true
    });
    $('.testimonials').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    });
    
    $('.reviewslider').slick({
      infinite: true, 
      centerMode: true, 
      slidesToShow: 3,
      slidesToScroll: 2,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            slidesToScroll: 1
          }
        }
      ]
    });
 
    $('.mega-parent-menu').hover(function (e) {
      e.preventDefault();
      $(this).find('.nav-item--submenu, .nav-item--submenu--fw').show();
    }, function () {
      $(this).find('.nav-item--submenu, .nav-item--submenu--fw').hide();
    });
    
    $('.mob-parent-menu').click(function(e){
      //e.preventDefault();
      var sub_menu = $(this).find('.mobileSubMenu');
      if(sub_menu){
        if ($(sub_menu).is(':visible')) {
          $(sub_menu).slideUp();
        } else {
          $(sub_menu).slideDown();
        }  
      }
    });

    $(".mobNavHam--wrapper").click(function () {
      if ($('#mobMenu').is(':visible')) {
        $('#mobMenu').slideUp();
        $('.mobileNavHam').removeClass('mobHamClose');
        $('html').css('overflow', 'visible');
      } else {
        $('#mobMenu').slideDown();
        $('.mobileNavHam').addClass('mobHamClose');
        $('html').css('overflow', 'hidden');
      }
    });

    $(window).on('resize', function () {
      var windowWidth = $(window).width();

      if (windowWidth > 999) {
        $('#mobMenu').css('display', 'none');
        $('html').css('overflow', 'visible');
      }

      if (windowWidth < 999) {
        $("nav-item--submenu--fw--inner").css('display', 'none');
        $("nav-item--submenu").css('display', 'none');

        if ($('.mobileNavHam').hasClass('mobHamClose') === true) {
          $('.mobileNavHam').toggleClass('mobHamClose');
        }
      }
    }); // for accordion on faq page

    rivets.binders["accordion"] = function (el, value) {
      var $row_wrap = jQuery(el);
      var $clickable = $row_wrap.find('[data-accordion-clickable*=' + value + ']');
      var $content = $row_wrap.find('[data-accordion-content*=' + value + ']');
      $clickable.on('click', toggle_accordion_row);
      $content.hide(); // --- functions ---

      function toggle_accordion_row(ev, scope) {
        close_all_row($row_wrap);
        toggle_section($row_wrap);
      }

      function close_all_row($omit) {
        jQuery('[sm-accordion*=' + value + '].active').each(function () {
          var $this_row_wrap = jQuery(this);

          if ($this_row_wrap[0] !== $omit[0]) {
            toggle_section($this_row_wrap);
          }
        });
      }

      function toggle_section($this_row_wrap) {
        var $this_content = $this_row_wrap.find('[data-accordion-content*=' + value + ']');
        $this_row_wrap.toggleClass('active');
        $this_content.slideToggle();
      }
    };

    jQuery('.header__cartButton').on('click', function () {
      /*
      if ($('#sm-ajax-cart').is(':visible')) {
        $('#sm-ajax-cart').slideUp();
      } else {
        $('#sm-ajax-cart').slideDown();
      }*/
      window.location.href = "/cart";
    });
    $(document).mouseup(function (e) {
      var con = $("#sm-ajax-cart");

      if (!con.is(e.target) && con.has(e.target).length === 0 && $('#sm-ajax-cart').is(':visible')) {
        $('#sm-ajax-cart').slideUp();
      }
    });
    $('.videoModal__overlay').on('click', function () {
      $('.videoModal').fadeOut(400, function () {
        $('.videoModal__wrapperInner').html('');
      });
    });
    $('.video-exit').on('click', function () {
      $('.videoModal').fadeOut(400, function () {
        $('.videoModal__wrapperInner').html('');
      });
    });
    $('[vidref]').on('click', function (e) {
      e.preventDefault();
      var frameCode = $(this).attr('vidref');
      $('.videoModal__wrapperInner').html(frameCode);
      $('.videoModal').fadeIn();
    });
    
    $('[sm-accordion]').each(function () {
      var thisThing = $(this);
      thisThing.find('.faqAccordion-Title').on('click', function () {
        var target = thisThing.find('.faqAccordion_container');

        if (target.is(':visible')) {
          target.slideUp();
          $(this).find('span').removeClass('active');
        } else {
          target.slideDown();
          $(this).find('span').addClass('active');
        }
      });
    }); // 

    $('.prodTab1').on('click', function () {
      if ($('.prodRev__faq').is(':visible')) {
        $('.prodTab').removeClass('prodTab--active');
        $(this).addClass('prodTab--active');
        $('.prodRev__faq').slideUp(400, function () {
          $('.prodRev__reviews').slideDown(400);
        });
      }
    });
    $('.prodTab2').on('click', function () {
      if ($('.prodRev__reviews').is(':visible')) {
        $('.prodTab').removeClass('prodTab--active');
        $(this).addClass('prodTab--active');
        $('.prodRev__reviews').slideUp(400, function () {
          $('.prodRev__faq').slideDown(400);
        });
      }
    });
    $(window).on("scroll load", function (event) {
      if ($('#shopify-section-sm-product').length) {
        var divHeight = $('#shopify-section-sm-product').height();

        if ($(document).scrollTop() > divHeight - 80) {
          $("body").addClass("scrolled2");
        } else {
          $("body").removeClass("scrolled2");
        }
      }else if($('#shopify-section-sm-product-new').length){
        var divHeight = $('#shopify-section-sm-product-new').height();

        if ($(document).scrollTop() > divHeight - 80) {
          $("body").addClass("scrolled2");
        } else {
          $("body").removeClass("scrolled2");
        }      
      }
    });
    var oldScroll = $(document).scrollTop();
    var newScroll = oldScroll;
    $(window).on("scroll load", function (event) {
      if ($('#shopify-section-header').length) {
        newScroll = $(document).scrollTop();
        var divHeight = $('#shopify-section-header').height();

        if (newScroll > oldScroll) {
          if ($(document).scrollTop() > divHeight) {
            $("body").addClass("scrolled3");
            $(".mobNavHam--wrapper").addClass("scrolled3");
            $(".shopping-cart").addClass("scrolled3");
          } else {
            $("body").removeClass("scrolled3");
            $(".mobNavHam--wrapper").removeClass("scrolled3");
            $(".shopping-cart").removeClass("scrolled3");
          }
        } else {
          $("body").removeClass("scrolled3");
          $(".mobNavHam--wrapper").removeClass("scrolled3");
          $(".shopping-cart").removeClass("scrolled3");
        }

        oldScroll = $(document).scrollTop();
      }
    });
    
    $('.has-modal-link a').on('click', function(){
      $(this).parents('.has-modal-popup').find('.popup-content > *').clone().appendTo(".contentModal__wrapperInner");
      $('.contentModal').css('display', 'block');
    });
    $('.content-exit').on('click', function(){
      $('.contentModal__wrapperInner').empty();
      $('.contentModal').css('display', 'none');
    });

    
    
  });
})(jQuery); // Starter Theme by Sleepless Media
//This file is intended to be used for small ongoing fixes or changes post-launch.
// Starter Theme by Sleepless Media
//This file is intended to be used for small ongoing fixes or changes post-launch.