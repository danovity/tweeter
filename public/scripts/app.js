/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {

    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    $('.new-tweet__submitBtn').on("click", function (e) {
        e.preventDefault();
        const $textArea = $(this).siblings("textarea");
        const $counter = $(this).siblings(".counter");
        const $userInput = $textArea.val();
        if ($userInput.length > 140) {
            $(".new-tweet__errorMessage").slideDown("fast").text("The tweet must be within 140 characters");
            return false;
        } else if ($userInput.length === 0) {
            $(".new-tweet__errorMessage").slideDown("fast").text("You have to enter your tweet before posting.");
            return false;
        }

        var string = $(this)
            .parent(".new-tweet__form")
            .serialize();

        //post and get then render new tweets
        $.ajax({
            type: "POST",
            url: "/tweets/",
            datatype: 'json',
            data: string //success
        }).done((msg) => {
            console.log("Data Saved.", msg);
            $(".single-tweet").remove();
            $.ajax('/tweets', {
                    method: 'GET'
                })
                .then((response) => {
                    console.log('Success: ', response);
                    $textArea.val("");
                    $counter.text("140");
                    $(".new-tweet__errorMessage").slideUp("fast");
                    renderTweets(response);
                });
        });
    });

    function createTweetElement(tweet) {
        const name = tweet.user.name;
        const handle = tweet.user.handle;
        const avatarUrl = tweet.user.avatars.small;
        const content = tweet.content.text;
        const timeStamp = new Date(tweet.created_at).getTime();
        const today = new Date().getTime();
        const time = Math.floor((today - timeStamp) / 1000 / 60 / 60 / 24);
        let element = `
          <div class="single-tweet">
            <div class="single-tweet__rowOne">
            <img class="single-tweet__userIcon" src="${avatarUrl}">
            <h2 class="single-tweet__userName">${name}</h2>
            <p class="single-tweet__twitterName">${handle}</p>
            </div>
            <div class="single-tweet__rowTwo">
            <p class="single-tweet__textArea">
                ${escape(content)}
            </p>
            </div>
            <div class="single-tweet__rowThree">
            <div class="single-tweet__daysAgo">
                ${time} days ago
            </div>
            <div class="single-tweet__likesContainer">
      <div class="single-tweet__likesLabel">Likes</div>
      <div class="single-tweet__likesCount">0</div>
    </div>
            <div class="single-tweet__twitterIcons">
                <p alt="flag" class="single-tweet__twitterIcons--flag">Flag</p>
                <p alt="retweet" class="single-tweet__twitterIcons--retweet">Retweet</p>
                <p alt="heart" class="single-tweet__twitterIcons--heart">Heart</p>
            </div>
            </div>
            </div>
            `;

        return element;
    }

    function renderTweets(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container

        tweets.sort((a, b) => {
            var timeA = a.created_at;
            var timeB = b.created_at;
            if (timeA < timeB)
                //sort string ascending
                return 1;
            if (timeA > timeB) return -1;
        }).forEach((cur, i) => {
            let $tweet = createTweetElement(cur);
            $(".display-tweets").append($tweet);
        });
    }

});