$(document).ready(function () {
  const renderTweets = function (tweets) {
    const $tweetContainer = $(".articleTweets");
    $tweetContainer.empty();
    const localTweets = tweets.sort((a, b) => {
      return b.created_at - a.created_at;
    });
    $.each(localTweets, (i) => {
      const $tweet = createTweetElement(tweets[i]);
      $tweetContainer.append($tweet);
    });
    return $tweetContainer;
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((result) => {
        renderTweets(result);
      })
      .catch((err) => {
        console.log("this is error from get ajax", err);
      });
  };

  loadTweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let safeText = `<p>${escape(tweet.content.text)}</p>`;
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
      ${safeText}
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
    return $tweet;
  };

  $(".errLong").hide();
  $(".errShort").hide();

  $("form").on("submit", function (event) {
    event.preventDefault();

    const value = $(this).serialize();
    console.log("what is this", value);
    if (value === "text=") {
      $(".errShort").slideDown();
    } else if (value.length > 140) {
      $(".errShort").hide();
      $(".errLong").slideDown();
    } else {
      $.post("/tweets", value)
        .then((result) => {
          $("#tweet-text").val("");
          $(".errLong").hide();
          $(".errShort").hide();
          loadTweets();
        })
        .catch((err) => {
          console.log("error with ajax");
          console.log(err);
        });
    }
  });
});
