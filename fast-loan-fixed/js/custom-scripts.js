$(document).ready(function () {

    /**** animation scripts *****/
    $('.animated').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            $(this).animate({
                opacity:'1',
                left:'0'
            }, 1500);
        },
        doOut: function() {
            $(this).css('opacity', '0');
            $(this).css('left', '-30px');
        },
        tolerance: 0,
        throttle: 50,
        toggleClass: 'onScreen',
        lazyAttr: null,
        lazyPlaceholder: 'someImage.jpg',
        debug: false
    });
    /** end of animation scripts **/

    /********** the calculator *********/
    $('.calculator-menu li').click(function(){
        if (!$(this).hasClass('active')){
            $('.calculator-menu li').removeClass('active');
            $(this).addClass('active');
            $(".days-number").slider( "option", "value", 1);
            $('.days-number-current span').html(1);
            if ($('.calculator-menu li').index(this) == 0){
                $('.percent-rate span').html('2.00');
                $('.min-loan-value').html(3000);
                $(".loan-value").slider( "option", "min", 3000);
                $('.max-loan-value').html(30000);
                $(".loan-value").slider( "option", "max", 30000);
                $(".loan-value").slider( "option", "step", 1000);
                $('.loan-value-current span').html('3000');
                $('.credit-value span').html('3060');
                $(".loan-value").slider( "option", "value", 3000);
                $(".days-number").slider( "option", "max", 20);
                $('.max-days-number').html(20);
            } else if($('.calculator-menu li').index(this) == 1) {
                $('.percent-rate span').html('1.50');
                $('.min-loan-value').html(2000);
                $(".loan-value").slider( "option", "min", 2000);
                $('.max-loan-value').html(15000);
                $(".loan-value").slider( "option", "max", 15000);
                $(".loan-value").slider( "option", "step", 1000);
                $('.loan-value-current span').html('2000');
                $('.credit-value span').html('2030');
                $(".loan-value").slider( "option", "value", 2000);
                $(".days-number").slider( "option", "max", 30);
                $('.max-days-number').html(30);
            } else {
                $('.percent-rate span').html('0.38');
                $('.min-loan-value').html(35000);
                $(".loan-value").slider( "option", "min", 35000);
                $('.max-loan-value').html(100000);
                $(".loan-value").slider( "option", "max", 100000);
                $(".loan-value").slider( "option", "step", 5000);
                $('.loan-value-current span').html('35000');
                $('.credit-value span').html('35133');
                $(".loan-value").slider( "option", "value", 35000);
                $(".days-number").slider( "option", "max", 30);
                $('.max-days-number').html(30);
            }
        }
    });

    /*** the loan-scale ***/
    $(function() {
        $('.loan-value').slider({
            min: 3000,
            max: 30000,
            step: 1000,
            range: "min",
            value: 3000,
            slide: function( event, ui ) {
                var calLoan = ui.value;
                var calDays = $(".days-number").slider( "option", "value" );
                var calCredit = calulateUsualCredit(calLoan, calDays);
                $('.loan-value-current span').html(ui.value);
                $('.credit-value span').html(calCredit);
            }
        });
    });

    /*** the time-scale ***/
    $(function() {
        $('.days-number').slider({
            min: 1,
            max: 20,
            step: 1,
            range: "min",
            value: 1,
            slide: function( event, ui ) {
                var calLoan = $(".loan-value").slider( "option", "value" );
                var calDays = ui.value;
                var calCredit = calulateUsualCredit(calLoan, calDays);
                $('.days-number-current span').html(calDays);
                $('.credit-value span').html(calCredit);
            }
        });
    });

    function calulateUsualCredit(calLoan, calDays) {
        var calPercent = (+$('.percent-rate span').html())/100;
        if (calDays < 15) {
            return calLoan + calDays*calPercent*calLoan;
        } else {
            return calLoan + $('.days-number').slider("option", "max")*calPercent*calLoan;
        }
    }
    /** the end of the the calculator **/

    /*********** the modal windows *********/
    $('.get-loan').click(function () {
        $('.loan-summa input').val($(".loan-value").slider( "option", "value"));
        $('.loan-term input').val($(".days-number").slider( "option", "value"));
        $('.window-callback-order').fadeIn();
    });
    $('.window-callback-order').click(function (event) {
        $target = $(event.target);
        if (!$target.closest($('.form-callback-order')).length) $('.window-callback-order').fadeOut();
        if ($target.hasClass('close-window')) $('.window-callback-order').fadeOut();
    });

    setTimeout(function(){
        $('.form-callback-2').animate({bottom:'0'}, 1000);
    },45000);
    $('.form-callback-2').click(function (event) {
        $target = $(event.target);
        if ($target.hasClass('close-window')){
            $('.form-callback-2').animate({bottom:'-275'}, 1000);
        }
    });
    /**** the end of the modal window *****/

    /*  for window-callback test */
    /*$('.calculator .get-loan').click(function () {
        $('.window-callback').fadeIn();
    });
    $('.window-callback').click(function (event) {
        $target = $(event.target);
        if (!$target.closest($('.form-callback')).length) $('.window-callback').fadeOut();
        if ($target.hasClass('close-window')) $('.window-callback').fadeOut();
    });*/

    /* for form-callback-4, form-callback-5, form-callback-7, form-callback-8 test */
    /*setTimeout(function(){
        $('.form-callback-8').animate({right:'0'}, 1000);
    },1000);
    $('.form-callback-8').click(function (event) {
        $target = $(event.target);
        if ($target.hasClass('close-window')){
            $('.form-callback-8').animate({right:'-340'}, 1000);
        }
    });*/

});