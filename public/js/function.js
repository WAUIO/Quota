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

        $('.select_data').perfectScrollbar();
        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });

    /**************/
    $(".selectpicker").attr("disabled","disabled");
    // $(".form-control").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    /*******checkbox event*******/
    $("input[type=checkbox]").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(2);
        var select_picker = parent.find('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }
    });
    $("#search_control").removeAttr("disabled");
    total_dataTable();
    somme("#table_single_room");
    //somme("#table_double_room");
});

function somme(table_id){
    length = $('.tr_'+table_id).length;

    long = $(table_id+' tbody tr:eq(1) td').length;
    for (i=0;i<long-3;i++) {
        var total = 0;
        $('td_'+table_id+':eq(' + i + ')', '.tr_'+table_id).each(function(i) {
            console.log($(this).text());
            total = total + parseInt($(this).text());
        });
        //console.log('total : '+total);
        $('tr_total .total_'+table_id).eq(i).text(total);
    }
}

function total_dataTable(){
    var $TABLE = $('#table');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');

    $('.table-add').click(function () {
        table_id = $(this).siblings('table').attr('id');
        var $clone = $TABLE.find('#'+table_id+' tr.hide').clone(true).removeClass('#'+table_id+' hide');
        $TABLE.find('#'+table_id+' .tr_total').before($clone);
    });

    $('.table-remove').click(function () {
        $(this).parents('tr').detach();
    });

    /*$('.table-up').click(function () {
        var $row = $(this).parents('tr');
        if ($row.index() === 1) return; // Don't go above the header
        $row.prev().before($row.get(0));
    });

    $('.table-down').click(function () {
        var $row = $(this).parents('tr');
        $row.next().after($row.get(0));
    });*/

// A few jQuery helpers for exporting only
    jQuery.fn.pop = [].pop;
    jQuery.fn.shift = [].shift;

    $BTN.click(function () {
        var $rows = $TABLE.find('tr:not(:hidden)');
        var headers = [];
        var data = [];

        // Get the headers (add special header logic here)
        $($rows.shift()).find('th:not(:empty)').each(function () {
            headers.push($(this).text().toLowerCase());
        });

        // Turn all existing rows into a loopable array
        $rows.each(function () {
            var $td = $(this).find('td');
            var h = {};

            // Use the headers from earlier to name our hash keys
            headers.forEach(function (header, i) {
                h[header] = $td.eq(i).text();
            });

            data.push(h);
        });

        // Output the result
        $EXPORT.text(JSON.stringify(data));
    });
}