(function(){
  $(document).ready(function(){
    var canvas = document.getElementById('landing-canvas');
    var context = canvas.getContext('2d');
    
    function unstretch(){
      var canv = $('#landing-canvas');
      var height = canv.height();
      var width = canv.width();
      canvas.setAttribute('height', height);
      canvas.setAttribute('width', width); 
    }
    
    function getNearestDots(num){
      var reduced = Math.floor(num/33);
      var flat = reduced * 33;
      return [flat, flat+33, flat-33, flat+66];
    }
    
    function drawLines(event){
      context.clearRect(0, 0, canvas.width, canvas.height);
      var xLines = getNearestDots(event.pageX);
      var yLines = getNearestDots(event.pageY);

      context.fillStyle = "#fff";
      context.fillRect(xLines[0]-33, yLines[0]-33, 98, 98);
          
      for (var i = 0; i < 4; i++){
        for (var j = 0; j < 4; j++){
          context.beginPath();
          context.moveTo(xLines[i], yLines[j]);
          context.strokeStyle = '#eceeef';
          context.lineTo(event.pageX, event.pageY);
          context.stroke();
        }
      }
    }
    
    $(window).resize(function(){
      unstretch();
    })
    
    $('.landing').on('mousemove', function(event){
      drawLines(event);
    })
    
    $('#landing-canvas').bind('contextmenu', function(e){
      return false;
    }); 
    
    unstretch();
  })
})();