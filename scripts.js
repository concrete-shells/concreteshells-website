console.log("It works");

$(document).ready(function() {
    //NavBar
    $(document).ready(function(){
        $('.menu-toggle').click(function(){
            $('nav').toggleClass('active')
        });
    });
    //Contact Form
    $('.submit').click(function(event) {
        console.log('Clicked Button')
        var name = $('.name').val()
        var email = $('.email').val()
        var phone = $('.phonenumber').val()
        var subject = $('.subject').val()
        var relation = $('.relation').val()
        var message = $('.message').val()
        var statusElm = $('.status')
        statusElm.empty()

        if(name.length > 0) {
            statusElm.append('<div>Name is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Name is not valid</div>')
        }

        if(email.length > 5 && email.includes('@') && email.includes('.')) {
            statusElm.append('<div>Email is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Email is not valid</div>')
        }

        if(subject.length >= 2) {
            statusElm.append('<div>Subject is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Subject is not valid. Should be 2 characters or longer.</div>')
        }

        if(message.length > 5) {
            statusElm.append('<div>Message is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Message is not valid. Should be 5 characters or longer.</div>')
        }
    });
    //Blog Slick Carousel
    $('.post-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
    });
});
