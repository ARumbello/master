document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.clinical-studies-inner .container .btn--blue');
      
      buttons.forEach(button => {
        const link = button.querySelector('a');

        button.addEventListener('mouseenter', function() {
          link.style.color = '#0FA3FA';
        });

        button.addEventListener('mouseleave', function() {
          link.style.color = 'white';
        });
      });

    if(document.querySelectorAll('.product_template_new .product-single__meta div[id^="shopify-block-judge_me_reviews_preview_badge"]').length > 0) {
          document.querySelector('.product_template_new .product-single__meta div[id^="shopify-block-judge_me_reviews_preview_badge"]').addEventListener('click', () => {
          
             //document.querySelector('.shopify-tabs li[data-tab="tab-delivery"]').click();
             var headerHeight = document.querySelector('.site-header').offsetHeight + 20;
        
             // Assuming the element has the attribute data-id="product-benefits"
             var scrollToElement = document.querySelector(`.index-section .shopify-app-block`);
        
             if (scrollToElement) {
                 // Calculate total scroll position
                 var elementRect = scrollToElement.getBoundingClientRect();
                 var totalScrollPosition = elementRect.top + window.pageYOffset - headerHeight;
        
                 // Scroll to the calculated position
                 window.scrollTo({
                     top: totalScrollPosition,
                     behavior: 'smooth'
                 });
             } else {
                 console.error('Element to scroll to not found.');
             }
       });  
    }

    if(document.querySelectorAll('.prodMain__right .prodMain__text').length > 0) {
          if(document.querySelectorAll('.call-to-action-section .button').length > 0) {
            document.querySelector('.call-to-action-section .button').setAttribute('href', '#');
          }
        /*  document.querySelector('.call-to-action-section .button').addEventListener('click', (e) => {
             e.preventDefault();
          
             scrollTop('.prodMain__right .prodMain__text');
       });  */
    }

    function scrollTop(elementName) {
        var headerHeight = document.querySelector('.site-header').offsetHeight + 20;
        var scrollToElement = document.querySelector(elementName);
        if (scrollToElement) {
             // Calculate total scroll position
             var elementRect = scrollToElement.getBoundingClientRect();
             var totalScrollPosition = elementRect.top + window.pageYOffset - headerHeight;
             // Scroll to the calculated position
             window.scrollTo({
                 top: totalScrollPosition,
                 behavior: 'smooth'
             });
         } else {
             console.error('Element to scroll to not found.');
         }
    }  

    if(document.querySelectorAll('.product-box .product-single__meta').length > 0) {
       //  if(document.querySelectorAll(' .image-text-section .button').length > 0) {
       //    document.querySelector(' .image-text-section .button').setAttribute('href', '#');
       //  }
       //  document.querySelector(' .image-text-section .button').addEventListener('click', (e) => {
       //     e.preventDefault();
       //     scrollTop('.product-box .product-single__meta');
       // });  
    }

   if(document.querySelectorAll('.product-box .product-single__meta').length > 0) {
       //  if(document.querySelectorAll(' .richtext-section a').length > 0) {
       //    document.querySelector(' .richtext-section a').setAttribute('href', '#');
       //  }
       //  document.querySelector(' .richtext-section a').addEventListener('click', (e) => {
       //     e.preventDefault();
       //     scrollTop('.product-box .product-single__meta');
       // });  
    }

  
  
    


    // Function to check for the element and add a class to its sub-elements
    function checkAndAddClass() {
      const elements = document.querySelectorAll('.jdgm-rev__reply');
      
      elements.forEach(element => {
        const subElement = element.querySelector('.jdgm-rev__replier-wrapper'); // Replace with the actual class of the sub-element
        if (!subElement && !element.classList.contains('no-border')) { // Check if sub-element exists and doesn't already have the new class
          element.classList.add('no-border'); // Replace 'new-class' with the class you want to add
        }
      });
    }
  
    // Set an interval to repeatedly check for the elements
    const intervalId = setInterval(() => {
      checkAndAddClass();
    }, 100); // Adjust the interval time (in milliseconds) as needed
  
    // Optional: Clear the interval after a certain time to stop checking (e.g., after 30 seconds)
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000); // Stop checking after 30 seconds

});