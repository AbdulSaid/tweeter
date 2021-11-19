$(document).ready(function() {
  
  $("#tweet-text").on('keyup', function(event) {
    let characterCount = $(this).val().length;
    let maxCounter = 140;
    let remainingCharacter = maxCounter - characterCount;
    $('.counter').text(remainingCharacter);
    if (remainingCharacter < 0) {
      $('.counter').css("color","red");
    } else {
      $('.counter').css("color","black");
    }
  });

  

});