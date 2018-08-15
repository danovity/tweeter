$(document).ready(function () {
    $(".new-tweet__form")
        .children()
        .on("keydown keypress keyup", function () {
            var currentValue = 140 - this.value.length;

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

    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});