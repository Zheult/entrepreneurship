$(document).ready(function () {
    $(document).foundation();

    $('#navigation').find('h2 a').on('click', function (e) {
        e.preventDefault();
        var $parent = $(this).parent();
        var offsetTop = $parent.offset().top - 60;
        $('html, body').animate({scrollTop: offsetTop});
        $parent.closest('div').toggleClass('open');
    });

    $('.middle-links h3 a').on('click', function (e) {
        e.preventDefault();
        $(this).parent().next('form').toggle();
    });

    $('#slider').Slider({arrows: false, scrollwheel: false});
});