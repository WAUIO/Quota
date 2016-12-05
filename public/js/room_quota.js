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
            if(new_price % 1 != 0){
                new_price = new_price.toFixed(2);
            }

            tr.siblings().eq(value).find('td').eq(1).find('.mga_value').text(new_price);
            tr.siblings().eq(value).find('td').eq(2).text((new_price/euro).toFixed(2));
            tr.siblings().eq(value).find('td').eq(3).text((new_price/dollar).toFixed(2));
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
