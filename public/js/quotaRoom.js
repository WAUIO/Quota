$( function() {
    $(document).on('show','.accordion', function (e) {
        $(e.target).prev('.accordion-heading').addClass('accordion-opened');
    });

    $(document).on('hide','.accordion', function (e) {
        $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
    });

    $('.registration_title_active').css({'background':'#2B838E', 'border':'none'});

    $('.detail_body').perfectScrollbar();

    $('.family_member').on('change keyUp', function () {
        calculateFamilyTotal($(this));
    });

    $('.registration_menu').click( function(){
        var id = $(this).attr('id').replace('registration_','');
        if($('#registration_prestation').length || $('#current_customer').length) {
            $('.group_table').hide();
            $('#group_' + id).show();

            $('.registration_menu').removeClass('active');
            $(this).addClass('active');
        }else{
            $('#registration_title_'+id).trigger('click');
        }
    });

    $('.registration_title').click( function(){
        $(document).scrollTop(0);
        var id = $(this).attr('id').replace('registration_title_','');
        $('.group_table').hide();
        $('#group_'+id).show();

        $('.registration_menu').removeClass('active');
        $('#registration_'+id).addClass('active');
        $('.registration_title').css({'background':'#F6F6F6', 'border':'none'});
        $(this).css('background', '#2B838E');
    });

    detailView();
});

function calculateFamilyTotal($this){

    var $table = $('#'+$this.closest('table').attr('id'));
    var number = $this.val();
    var euro = $table.find('.exchange_euro').text();
    var dollar = $table.find('.exchange_dollar').text();
    if ($.isNumeric(number)){
        var tr = $this.closest('tr');
        var total = 0;

        //update value
        //1 for room
        //3 for vignette
        //4 for tax
        $.each([1,3,4], function( index, value ) {
            var price = tr.siblings().eq(value).find('td').eq(1).find('.hide').text();
            var new_price = price / number;

            tr.siblings().eq(value).find('td').eq(1).find('.mga_value').text(roundValue(new_price));
            tr.siblings().eq(value).find('td').eq(2).text(roundValue((new_price/euro)));
            tr.siblings().eq(value).find('td').eq(3).text(roundValue((new_price/dollar)));
        });

        //make sum
        $.each([1,2,3,4], function( index, value ) {
            total += parseFloat(tr.siblings().eq(value).find('td').eq(1).find('.mga_value').text());
        });
        $this.closest('td').siblings().eq(0).find('.mga_value').text(roundValue(total));
        $this.closest('td').siblings().eq(1).text(roundValue(total/euro));
        $this.closest('td').siblings().eq(2).text(roundValue((total/dollar)));
    }
}

function detailView() {
    //detail hide
    $('.detail_head').click(function(e){
        e.preventDefault();
        var detail_id = '#'+$(this).parents().attr("id");
        if($(detail_id+' .detail_body').is(":visible") === false){
            $(detail_id +' .detail_body').fadeIn();
            $(detail_id +' .detail_foot').fadeIn();
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-down").toggleClass("glyphicon-menu-up");
        }else{
            $(detail_id +' .detail_foot').hide();
            $(detail_id +' .detail_body').hide();
            $(this).find(".glyphicon").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
        }
    });
}