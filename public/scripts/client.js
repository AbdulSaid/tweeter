/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  const $tweetContainer = $(".articleTweets")
  // loops through tweets
  $.each(tweets, (i) => {
    console.log('data',data)
    console.log('userinfo',tweets[i])
    // calls createTweetElement for each tweet
   const $tweet = createTweetElement(tweets[i])
   console.log("$tweett",$tweet)
   $tweetContainer.append($tweet);

  })

  // takes return value and appends it to the tweets container
  return $tweetContainer

}


const createTweetElement = function(tweet) {
  let $tweet = $(
    `<div class="tweetDiv">
    <header class="tweetsHeader">
      <section class="namePic">
        <img class="profileImage" src=${tweet.user.avatars} />
        <p>${tweet.user.name}</p>
      </section>
      <section class="atName">
        ${tweet.user.handle}
      </section>
    </header>
    <section class="areaForTweets">
      ${tweet.content.text}
    </section>
    <footer class="footerTweets">
      <div>${timeago.format(tweet.created_at)}</div>
      <div>
        <i class="hoverEffect fas fa-flag"></i>
        <i class="hoverEffect fas fa-retweet"></i>
        <i class="hoverEffect fas fa-heart"></i>
      </div>
    </footer>
    </div>`
    )
  
  // ...
  return $tweet;
}

renderTweets(data);


});

