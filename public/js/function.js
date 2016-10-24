$(document).ready(function () {
    $('#quota_list').perfectScrollbar();

    $('.based_on').removeAttr("href");

    //detail hide
    $('.detail_head').click(function(e){
        e.preventDefault();
        var detail_id = '#'+$(this).parents().attr("id");
        if($(detail_id+' .detail_body').is(":visible") === false){
            $(detail_id +' .detail_body').fadeIn();
            $(detail_id +' .detail_body_content').animate({marginTop:"-=100px"},300);
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-down").toggleClass("glyphicon-menu-up");
        }else{

            $(detail_id +' .detail_body').hide();
            $(detail_id +' .detail_body_content').hide();
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
        }
    });

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        var quota_list_id = $('#quota_list');
        if(quota_list_id.is(":visible") === true){
            quota_list_id.fadeOut();
            $(this).toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }else{
            quota_list_id.fadeIn();
            $(this).toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    });


    //Ancre Onclick base type
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-60 }, speed );
        return false;
    });


    /*pop up*/
    $('[data-popup-open]').on('click', function(e)  {
        console.log($('#quota_list').height());
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
});
