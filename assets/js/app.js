function showTab(container, tab) {
    $(container).toggle()
        .find('a[href="' + tab + '"]').click();
}

$(document).ready(function () {
    $(document).foundation();

    $('#slider').Slider({arrows: true, scrollwheel: true});

    $('.close-btn').on('click', function (e) {
        e.preventDefault();
        $(this).parent().hide();
    });
});