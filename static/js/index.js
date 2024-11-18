window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 10;

// Define messages directly in JavaScript
var messages = [
  "I see we already have Apple's website open. Let's navigate to the Pro Display XDR. I'll click on \"Store\" first and then search for the Pro Display XDR.",
  "Now, let me search for the Pro Display XDR. I'll click the search icon.",
  "I can see the Pro Display XDR results. Let me click on the Display option to get to the product page.",
  "Great, we're on the Pro Display XDR product page. I can see the option for nano-texture glass. Let me select that option since that's what you requested.",
  "I see we have options for the Pro Stand and VESA Mount Adapter. Since you mentioned you want all accessories, let's add the Pro Stand. First let me click on that option.",
  "Let me add the VESA Mount Adapter as well since it might be useful depending on your setup.",
  "I also see there's an option for AppleCare+ coverage. Let me add that for complete protection.",
  "I have added all the requested items to the cart. Would you like me to proceed to checkout or would you like to make any changes to the selections?",
  "I see the \"Add to Bag\" button. Let me click it to add all the selected items to your bag.",
  "Perfect! The Pro Display XDR with nano-texture glass and all accessories (Pro Stand, VESA Mount Adapter, and AppleCare+) have been added to your bag. You can click the \"Review Bag\" button to see the final order details and proceed to checkout if you'd like."
];

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(3, '0') + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      var index = this.value;
      setInterpolationImage(index);
      $('#interpolation-message').text(messages[index]); // Update message based on slider value
    });
  
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
    $('#interpolation-message').text(messages[0]); // Display the first message
  
    bulmaSlider.attach();

})
