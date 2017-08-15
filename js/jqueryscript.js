(function(){
  $(document).ready(function(){
    /*
      Variables
    */
    var currentPage = 'landing';
    var locations = {};
    var fullPages = ['landing', 'githubProjects', 'projects', 'contact'];
    var autoScrolling = false;
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';
    /*
     *
      jQuery events and functions
     *
     */
    $.urlHash = function(){
      var results = new RegExp('[\#&]([^&#]*)').exec(window.location.href);
      if (results==null){
        return null;
      }
      else{
        return results[1] || 0;
      }
    }
    
    /*
      Refresh Variables on window resize
    */
    $(window).on('resize', function(){
      setDivOffsetLocations();
    })
    
    /*
      Cancel animation on anyscroll
    */
    $(window).bind(wheelEvent+' DOMMouseScroll', function(){
      $('html,body').stop();
      autoScrolling = false;
    })
    /*
      Scroll to the href tag on a .scroll element. <a class="scroll" href="#test"></a> scrolls to test.    
    */
    $('.scroll').on('click', function(e){
      e.preventDefault();
      var a = $(this).attr('href').substr(1);
      var offset = $('.'+a).offset().top;
      if(!autoScrolling){
        scrollToOffset(offset);
      }
    });
    
    
    /*
      General ScrollTo Animation
    */
    function scrollToOffset(offset){
      if(!autoScrolling){
        autoScrolling = true;
        $('html,body').animate({
          scrollTop: offset
        }, 750, function(){
          autoScrolling = false;
        });
      }
    }
    /*
     *
      Basic Functions
     *
     */
    //Get all Offsets of each class in the full Pages Array and add them to the locations object
    function setDivOffsetLocations(){
      for (var i = 0, len = fullPages.length; i < len; i++){
        locations[fullPages[i]] = $('.'+fullPages[i]).offset();
      }
    }
    
    //Check to see if an event is supported by browser
    function isEventSupported(eventName) {
      var el = document.createElement('div');
      eventName = 'on' + eventName;
      var isSupported = (eventName in el);
      if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
      }
      el = null;
      return isSupported;
    }
    
    //On Page load if there is a Hash in URL scroll to loc
    function scrollToHash(){
      if ($.urlHash()){
        scrollToOffset(locations[$.urlHash()].top);
      } 
    }
    
    
    setDivOffsetLocations();
    scrollToHash();
  });
})();