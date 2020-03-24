(function ($) {
    $(function () {

        // button-to-top scripts
        var btn = $('#button-to-top');

        $(window).scroll(function () {
            if ($(window).scrollTop() < 800) {
                btn.css("opacity", 0);
                btn.css("visibility", "hidden");
            } else {
                btn.css("opacity", 1);
                btn.css("visibility", "visible");
            }
        });

        btn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, '300');
        });

        $('.slick-autoplay-sponsor').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            pauseOnHover: false,
            infinite: true,
            // centerMode: true,
        });

        $('.slick-autoplay').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true
        });
        
    }); // end of document ready
})(jQuery); // end of jQuery name space