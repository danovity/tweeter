$(document).ready(function () {
    $(".new-tweet__form").children().on('keydown keypress keyup', function () {
        var currentValue = 140 - this.value.length;

        $(".counter").text(currentValue);

        if (currentValue < 0) {
            $(".counter").css('color', 'red');
        }
    });
});