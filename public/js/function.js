$(document).ready(function () {

    $('#quota_list').perfectScrollbar();
    $('.table-editable').perfectScrollbar();
    $('.based_on').removeAttr("href");

    $('#search_glyphicon').click(function(e){
        e.preventDefault();
        var quota_list_id = '#quota_list';
        ShowHideQuotaList(quota_list_id, 0);
    });

    $(".selectpicker").attr("disabled","disabled");
    $("#select-hotel").removeAttr("disabled");
    $("#search_control").removeAttr("disabled");

    checkboxEvent();
    menuView();
    popupView();
    detailView();
    tableEvent();
    editValuePopup();
    calculateTotal();
    ancreLink();

});

function checkboxEvent() {
    /*******checkbox event*******/
    $("input[type=checkbox]").click(function () {
        var checkbox_id = $('#'+$(this).closest(this).attr("id"));
        var parent = checkbox_id.parents().eq(2);
        var select_picker = parent.closest('select');
        if($(this).is(':checked')){
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }else{
            $(select_picker).attr('disabled', !this.checked).selectpicker('refresh');
        }
    });
}

function menuView() {
    //Show & hide menu(Search and room basis)
    $('#menu_hamburger').click(function(e){
        e.preventDefault();
        var quota_list_id = '#quota_list';
        var bloc_well = $('.well');
        if(bloc_well.not('#well_search').css("display") == "block"){
            bloc_well.not('#well_search').fadeOut(100,function () {
                ShowHideQuotaList(quota_list_id, 1);
            });
        }else{
            ShowHideQuotaList(quota_list_id, 2);
            bloc_well.fadeIn();
        }
    });
}

function popupView() {
    //show
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        $('.select_data').perfectScrollbar();
        e.preventDefault();
    });

    //close
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
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

function ancreLink() {
    //Ancre Onclick base type
    $('.base_type').on('click', function() {
        var page = $(this).attr('href');
        var speed = 500;
        $('html, body').animate( { scrollTop: $(page).offset().top-60 }, speed );
        return false;
    });
}

function calculateTotal() {
    $('table').each(function(){
        somme(this.id);
    });
}

function editValuePopup() {
    $.fn.editable.defaults.mode = 'popup';
    $('.others').editable({
        type: 'text',
        inputclass:'lebar',
        showbuttons:true,
        title: 'Enter a value' ,
        value:'',
        validate: function(value) {
            if($.trim(value) == '') {
                return 'Numeric value required';
            }
            if ($.isNumeric(value) == '') {
                return 'Numeric value required';
            }else{
                $(this).on('hidden.bs.modal', function () {
                    table_id  = $(this).closest('table').attr('id');
                    length = $('#'+table_id+' tbody tr:eq(1) td').length;
                    for (i=1;i<length-2;i++) {
                        $(this).siblings().eq(i+1).text(value);
                    }
                    somme(table_id);
                });

            }
        }
    });
}

function isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
        return false;

    val = parseFloat(val);
    if (isNaN(val))
        return false;
    return true;
}

function ShowHideQuotaList(quota_list_id, nbr){
    if(nbr == 0){
        if($(quota_list_id).is(":visible") === true){
            $(quota_list_id).fadeOut();
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }else{
            $(quota_list_id).fadeIn();
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }else if(nbr == 1){
        if($(quota_list_id).is(":visible") === true){
            $(quota_list_id).fadeOut();
            $('#search_glyphicon').toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
        }
    }else{
        if($(quota_list_id).is(":visible") === false){
            $(quota_list_id).fadeIn();
            $('#search_glyphicon').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
        }
    }
}


function somme(table_id){
    var room_type = table_id.replace('table_','');
    var euro_exchange = parseFloat($('#euro_exchange').text()).toFixed(2);
    var dollar_exchange = parseFloat($('#dollar_exchange').text()).toFixed(2);

    length = $('#'+table_id+' tbody tr:eq(1) td').length;
    for (i=0;i<length-3;i++) {
        var total = 0;
        $('td.td_'+room_type+':eq(' + i + ')', 'tr').each(function(i) {
            if($(this).text() != ""){
                total = total + Number.parseFloat($(this).text());
            }
        });
        var total_USD = $('#'+table_id+' .tr_USD td');
        var total_EUR = $('#'+table_id+' .tr_EUR td');
        var total_MGA = $('#'+table_id+' .tr_MGA td');

        total_MGA.eq(i+2).text(total.toFixed(2));
        total_EUR.eq(i+1).text((total / euro_exchange).toFixed(2));
        total_USD.eq(i+1).text((total / dollar_exchange).toFixed(2));
    }
}

function tableEvent(){
    var $table = $('.table-editable');
    var $BTN = $('#export-btn');
    var $EXPORT = $('#export');

    /*** add others row ***/
    $('.table-add').click(function () {
        table_id = $(this).closest('table').attr('id');
        var $clone = $table.find('#'+table_id+' tr.hide').clone(true).removeClass('hide');
        $table.find('#'+table_id+' .tr_MGA').before($clone);
        $clone.attr('class','others');
    });

    $('.table-remove').click(function () {
        table_id = $(this).closest('table').attr('id');
        length = $('#'+table_id+' tbody tr:eq(1) td').length;
        for (i=1;i<length-1;i++) {
            $(this).parents('td').siblings().eq(i).text(0);
        }
        somme(table_id);
        $(this).parents('tr').detach();
    });

// A few jQuery helpers for exporting only
    /*jQuery.fn.pop = [].pop;
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
    });*/
}