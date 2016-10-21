$(document).ready(function () {
    $('.based_on').removeAttr("href");

    $('.detail_head').click(function(e){
        e.preventDefault();
        var detail_id = '#'+$(this).parents().attr("id");
        if($(detail_id+' .detail_body').is(":visible") === false){
            //$(detail_id +' .detail_body').show();
            e.preventDefault();
            $(detail_id +' .detail_body').fadeIn();
            $(detail_id +' .detail_body_content').animate({marginTop:"-=100px"},300);
            $(this).find(".glyphicon").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        }else{

            $(detail_id +' .detail_body').hide();
            $(detail_id +' .detail_body_content').hide();
            $(this).find(".glyphicon").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        }
    });

    //Onclick base type
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-60 }, speed );
        return false;
    });
});

