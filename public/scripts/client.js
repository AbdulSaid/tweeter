/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const renderTweets = function (tweets) {
    const $tweetContainer = $(".articleTweets");
    $tweetContainer.empty();
    const localTweets = tweets.sort((a,b) => {
      return b.created_at - a.created_at
    } )
    // loops through tweets
    $.each(localTweets, (i) => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[i]);
      $tweetContainer.append($tweet);
    });

    // takes return value and appends it to the tweets container
    return $tweetContainer;
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((result) => {
        // console.log("this is the result", result);
        renderTweets(result);
      })
      .catch((err) => {
        console.log("this is error from get ajax", err);
      });
  };

  loadTweets();

  const createTweetElement = function (tweet) {
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
    );

    // ...
    return $tweet;
  };

  
  // renderTweets(data);
  
    $("form").on("submit", function (event) {
      event.preventDefault();
      const value = $(this).serialize()
      console.log("what is this", value);
      if (value === "text=") {
        alert("Tweet content is too short")
      } else if (value.length > 140) {
        alert("Tweet content is too long")
      } else {
        $.post("/tweets", value)
        .then((result) => {
          loadTweets()
        })
        .catch((err) => {
          console.log("error with ajax");
          console.log(err);
        });
      }
        
    });
  

 
});
