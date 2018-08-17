$(document).ready(function () {
    $(".new-tweet__form")
        .children()
        .on("input", function () {
            var currentValue = 140 - this.value.length;
            $(".new-tweet__errorMessage").slideUp("fast");
            $(this)
                .siblings(".counter")
                .text(currentValue);

            if (currentValue < 0) {
                $(this)
                    .siblings(".counter")
                    .css("color", "red");
            } else if (currentValue > 0) {
                $(this)
                    .siblings(".counter")
                    .css("color", "");
            }
        });

    $(".nav-bar__composeBtn").on("click", function () {
        $(".new-tweet").toggle("slow", function () {
            $(".new-tweet__form").children("textarea").focus();
        });
    });

    $(".nav-bar__icon").on("click", function () {
        $(".nav-bar__email").slideToggle("fast", function () {
            $(".nav-bar__email").focus();
        });
        $(".nav-bar__password, .nav-bar__submitBtn").slideToggle("fast", function () {});

        $(".nav-bar__userInputContainer--logout").slideToggle("fast", function () {});
    });
});