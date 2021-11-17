$(document).ready(function() {
  
  $("#tweet-text").on('keyup', function(event) {
    let characterCount = $(this).val().length
    let maxCounter = 140
    let remainingCharacter = maxCounter - characterCount;
    // console.log($(this).val());
    // console.log(characterCount);
    console.log(remainingCharacter)
    $('.counter').text(remainingCharacter);
    if (remainingCharacter < 0) {
      $('.counter').css( "color","red")
    } else {
      $('.counter').css( "color","black")
    }
  })

  

})