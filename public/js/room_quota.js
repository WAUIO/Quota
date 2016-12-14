$( function() {
    $('#family_member').on('change keyup', function () {
        calculateFamilyTotal($(this));
    });
} );

function calculateFamilyTotal($this){

    var $table = $('#'+$this.closest('table').attr('id'));
    var number = $this.val();
    var euro = $table.find('.exchange_euro').text();
    var dollar = $table.find('.exchange_dollar').text();
    if ($.isNumeric(number)){
        var tr = $this.closest('tr');
        var total = 0;
        // var vignette = tr.siblings().eq(5).find('td').eq(1).find('.hide').text();
        // var tax = tr.siblings().eq(6).find('td').eq(1).find('.hide').text();
        $.each([1,5,6], function( index, value ) {
            var price = tr.siblings().eq(value).find('td').eq(1).find('.hide').text();
            var new_price = price / number;

            tr.siblings().eq(value).find('td').eq(1).find('.mga_value').text(roundValue(new_price));
            tr.siblings().eq(value).find('td').eq(2).text(roundValue((new_price/euro).toFixed(2)));
            tr.siblings().eq(value).find('td').eq(3).text(roundValue((new_price/dollar).toFixed(2)));
        });
        $.each([1,2,3,4,5,6], function( index, value ) {
            total += parseFloat(tr.siblings().eq(value).find('td').eq(1).find('.mga_value').text());
        });
        if(total % 1 != 0){
            total = total.toFixed(2);
        }
        $this.closest('td').siblings().eq(0).find('.mga_value').text(total);
        $this.closest('td').siblings().eq(1).text((total/euro).toFixed(2));
        $this.closest('td').siblings().eq(2).text((total/dollar).toFixed(2));
    }
}

function detailView() {
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
}